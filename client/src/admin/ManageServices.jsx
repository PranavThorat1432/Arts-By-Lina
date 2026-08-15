import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { serviceService } from "../services/serviceService";
import { formatPrice } from "../utils/helpers";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import AdminSubNav from "../components/admin/AdminSubNav";

const emptyForm = { name: "", description: "", startingPrice: "", order: "" };

const ManageServices = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchAll = async () => {
    try {
      const data = await serviceService.getAll();
      setServices(data);
      return data;
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const init = async () => {
      const data = await fetchAll();
      setLoading(false);
      if (location.state?.editItem) {
        const itemToEdit = data.find((s) => s._id === location.state.editItem._id) || location.state.editItem;
        handleEdit(itemToEdit);
      }
    };
    init();
  }, [location.state]);

  const handleEdit = (s) => {
    setEditing(s);
    setForm({ name: s.name, description: s.description, startingPrice: s.startingPrice, order: s.order || 0 });
    setFile(null); setPreview(null);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false); setEditing(null);
    setForm(emptyForm); setFile(null); setPreview(null);
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing && !file) { toast.error("Service image is required"); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("image", file);
      if (editing) {
        await serviceService.update(editing._id, fd);
        toast.success("Service updated");
      } else {
        await serviceService.create(fd);
        toast.success("Service added");
      }
      handleClose(); fetchAll();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await serviceService.delete(id);
      toast.success("Service deleted");
      setServices((p) => p.filter((s) => s._id !== id));
    } catch { toast.error("Failed to delete"); }
  };

  return (
    <div className="space-y-6">
      <AdminSubNav />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-brand-brown font-bold">Services</h1>
          <p className="font-body text-earth-500 text-sm mt-1">{services.length} services available</p>
        </div>
        <button onClick={() => { setEditing(null); setForm(emptyForm); setShowForm(true); }} className="btn-primary flex items-center gap-2 text-sm">
          <MdAdd size={18} /> Add Service
        </button>
      </div>

      {loading ? <Loader /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-earth-200">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={s.image?.url} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-lg text-brand-brown font-bold">{s.name}</h3>
                  <span className="font-body text-xs text-brand-gold font-bold bg-brand-cream border border-brand-gold/10 px-2 py-0.5 rounded-full shrink-0 ml-2">
                    {formatPrice(s.startingPrice)}+
                  </span>
                </div>
                <p className="font-body text-earth-500 text-xs line-clamp-2 mb-4">{s.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(s)} className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-earth-300 rounded-lg text-earth-600 hover:border-brand-gold hover:text-brand-gold text-xs font-body font-semibold transition-colors">
                    <MdEdit size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(s._id)} className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 text-xs font-body font-semibold transition-colors">
                    <MdDelete size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-earth-950/60 flex items-center justify-center p-4" onClick={handleClose}>
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-earth-200">
              <h2 className="font-display text-xl text-earth-900 font-semibold">{editing ? "Edit Service" : "Add Service"}</h2>
              <button onClick={handleClose} className="p-1 hover:bg-earth-100 rounded-full text-earth-500"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Service Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="input-field" placeholder="e.g. Bridal Mehndi" required />
              </div>
              <div>
                <label className="label">Description *</label>
                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className="input-field resize-none" rows={3} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Starting Price (₹) *</label>
                  <input type="number" value={form.startingPrice} onChange={(e) => setForm((p) => ({ ...p, startingPrice: e.target.value }))} className="input-field" placeholder="500" min="0" required />
                </div>
                <div>
                  <label className="label">Display Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))} className="input-field" placeholder="0" min="0" />
                </div>
              </div>
              <div>
                <label className="label">{editing ? "Replace Image" : "Service Image *"}</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full font-body text-sm text-earth-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-cream file:text-brand-gold hover:file:bg-brand-gold/10" />
                {(preview || (editing && !preview)) && (
                  <img src={preview || editing?.image?.url} alt="" className="w-full h-32 object-cover rounded-lg mt-2" />
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleClose} className="flex-1 py-2.5 border border-earth-300 rounded-lg font-body text-sm font-semibold text-earth-600 hover:bg-earth-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary py-2.5 text-sm disabled:opacity-60">{saving ? "Saving..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { galleryService } from "../services/galleryService";
import { GALLERY_CATEGORIES } from "../utils/constants";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { MdDelete, MdEdit, MdAdd, MdStar, MdStarBorder } from "react-icons/md";
import AdminSubNav from "../components/admin/AdminSubNav";

const CATEGORIES = GALLERY_CATEGORIES.filter((c) => c !== "All");

const emptyForm = { title: "", category: "", description: "", isFeatured: false };

const ManageGallery = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [saving, setSaving] = useState(false);

  const fetchAll = async () => {
    try {
      const data = await galleryService.getAll();
      setItems(data);
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
        const itemToEdit = data.find((i) => i._id === location.state.editItem._id) || location.state.editItem;
        handleEdit(itemToEdit);
      }
    };
    init();
  }, [location.state]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreviews(selected.map((f) => URL.createObjectURL(f)));
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, category: item.category, description: item.description || "", isFeatured: item.isFeatured });
    setFiles([]);
    setPreviews([]);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    setFiles([]);
    setPreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing && files.length === 0) { toast.error("Please select at least one image"); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => fd.append("images", f));
      if (editing) {
        await galleryService.update(editing._id, fd);
        toast.success("Design updated");
      } else {
        await galleryService.create(fd);
        toast.success("Design added");
      }
      handleClose();
      fetchAll();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery item?")) return;
    try {
      await galleryService.delete(id);
      toast.success("Deleted");
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleDeleteImage = async (itemId, publicId) => {
    if (!window.confirm("Remove this image?")) return;
    try {
      const updated = await galleryService.deleteImage(itemId, publicId);
      if (updated._id) {
        setItems((prev) => prev.map((i) => (i._id === itemId ? updated : i)));
        if (editing && editing._id === itemId) {
          setEditing(updated);
        }
        toast.success("Image removed");
      } else {
        setItems((prev) => prev.filter((i) => i._id !== itemId));
        if (editing && editing._id === itemId) {
          handleClose();
        }
        toast.success("Design deleted (no images remaining)");
      }
    } catch {
      toast.error("Failed to remove image");
    }
  };

  return (
    <div className="space-y-6">
      <AdminSubNav />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-brand-brown font-bold">Gallery Management</h1>
          <p className="font-body text-earth-500 text-sm mt-1">{items.length} designs in portfolio</p>
        </div>
        <button onClick={() => { setEditing(null); setForm(emptyForm); setShowForm(true); }} className="btn-primary flex items-center gap-2 text-sm">
          <MdAdd size={18} /> Add Design
        </button>
      </div>

      {loading ? <Loader /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-earth-200">
              <div className="relative aspect-square">
                <img src={item.coverImage?.url} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex gap-1">
                  {item.isFeatured && (
                    <span className="bg-brand-gold text-white text-xs px-2 py-0.5 rounded-full font-body">Featured</span>
                  )}
                  <span className="bg-brand-brown text-white text-xs px-2 py-0.5 rounded-full font-body">{item.category}</span>
                </div>
                <div className="absolute top-2 right-2 text-white text-xs bg-brand-brown/70 px-2 py-0.5 rounded-full font-body">
                  {item.images?.length} img
                </div>
              </div>
              <div className="p-3">
                <p className="font-display text-base text-earth-900 font-semibold truncate">{item.title}</p>
                {item.description && <p className="font-body text-earth-500 text-xs mt-1 line-clamp-1">{item.description}</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleEdit(item)} className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-earth-300 rounded-lg text-earth-600 hover:border-brand-gold hover:text-brand-gold text-xs font-body font-semibold transition-colors">
                    <MdEdit size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 text-xs font-body font-semibold transition-colors">
                    <MdDelete size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-earth-950/60 flex items-center justify-center p-4" onClick={handleClose}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-earth-200">
              <h2 className="font-display text-xl text-earth-900 font-semibold">{editing ? "Edit Design" : "Add New Design"}</h2>
              <button onClick={handleClose} className="p-1 hover:bg-earth-100 rounded-full text-earth-500"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className="input-field" placeholder="Design title" required />
              </div>
              <div>
                <label className="label">Category *</label>
                <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="input-field" required>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className="input-field resize-none" rows={3} placeholder="Optional description" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" checked={form.isFeatured} onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))} className="w-4 h-4 accent-brand-gold" />
                <label htmlFor="featured" className="font-body text-sm text-earth-700 font-medium cursor-pointer">Mark as Featured</label>
              </div>
              <div>
                <label className="label">{editing ? "Add More Images" : "Images *"}</label>
                <input type="file" accept="image/*" multiple onChange={handleFileChange} className="block w-full font-body text-sm text-earth-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-cream file:text-brand-gold hover:file:bg-brand-gold/10" />
                {previews.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {previews.map((src, i) => (
                      <img key={i} src={src} alt="" className="w-16 h-16 object-cover rounded-lg border border-earth-200" />
                    ))}
                  </div>
                )}
              </div>

              {/* Existing images when editing */}
              {editing && editing.images?.length > 0 && (
                <div>
                  <label className="label">Existing Images</label>
                  <div className="flex gap-2 flex-wrap">
                    {editing.images.map((img) => (
                      <div key={img.publicId} className="relative group">
                        <img src={img.url} alt="" className="w-16 h-16 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(editing._id, img.publicId)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full hidden group-hover:flex items-center justify-center text-xs"
                        >×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleClose} className="flex-1 py-2.5 border border-earth-300 rounded-lg font-body text-sm font-semibold text-earth-600 hover:bg-earth-50 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary py-2.5 text-sm disabled:opacity-60">{saving ? "Saving..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;

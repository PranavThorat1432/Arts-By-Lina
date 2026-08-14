import { useState, useEffect } from "react";
import { contactService } from "../services/contactService";
import { formatDate } from "../utils/helpers";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";
import { MdDelete, MdVisibility } from "react-icons/md";
import { FiX } from "react-icons/fi";
import AdminSubNav from "../components/admin/AdminSubNav";

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    contactService.getAll().then((data) => {
      setContacts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleView = async (contact) => {
    const updated = await contactService.getById(contact._id);
    setSelected(updated);
    setContacts((prev) => prev.map((c) => c._id === updated._id ? updated : c));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await contactService.delete(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success("Deleted");
    } catch { toast.error("Failed to delete"); }
  };

  return (
    <div className="space-y-6">
      <AdminSubNav />

      <div className="mb-6">
        <h1 className="font-display text-3xl text-brand-brown font-bold">Contact Messages</h1>
        <p className="font-body text-earth-500 text-xs mt-1">
          {contacts.length} messages · {contacts.filter((c) => !c.isRead).length} unread
        </p>
      </div>

      {loading ? <Loader /> : contacts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-earth-150 shadow-sm max-w-xl mx-auto">
          <p className="font-display text-2xl text-brand-brown font-bold">No messages yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-earth-150 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#FAF7F2] border-b border-earth-150">
                <tr>
                  {["", "Name", "Contact", "Message Preview", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 font-body text-[11px] font-bold text-earth-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-100">
                {contacts.map((c) => (
                  <tr key={c._id} className={`hover:bg-brand-cream/30 transition-colors ${!c.isRead ? "bg-brand-cream/20 font-semibold" : ""}`}>
                    <td className="px-3 py-4">
                      {!c.isRead && <div className="w-2.5 h-2.5 rounded-full bg-brand-gold mx-auto" />}
                    </td>
                    <td className="px-6 py-4">
                      <p className={`font-body text-sm ${!c.isRead ? "font-bold text-brand-dark" : "font-medium text-earth-700"}`}>{c.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-body text-xs text-earth-600">{c.phone}</p>
                      <p className="font-body text-[10px] text-earth-400">{c.email}</p>
                    </td>
                    <td className="px-6 py-4 font-body text-xs text-earth-600 max-w-[220px] truncate">{c.message}</td>
                    <td className="px-6 py-4 font-body text-xs text-earth-500 whitespace-nowrap">{formatDate(c.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleView(c)} className="p-2 bg-brand-cream hover:bg-brand-gold hover:text-white rounded-lg text-brand-gold transition-all" title="View"><MdVisibility size={16} /></button>
                        <button onClick={() => handleDelete(c._id)} className="p-2 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg text-red-500 transition-all" title="Delete"><MdDelete size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 bg-brand-brown/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-earth-150" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-earth-150 bg-[#FAF7F2]">
              <div>
                <h2 className="font-display text-xl text-brand-brown font-bold">Message Details</h2>
                <p className="font-body text-earth-400 text-[10px] mt-0.5">Received on {formatDate(selected.createdAt)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-earth-100 rounded-full text-earth-500"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 pb-2 border-b border-earth-50">
                <div>
                  <span className="font-body text-[10px] font-bold text-earth-400 uppercase tracking-wider">Sender Name</span>
                  <p className="font-body text-sm font-bold text-brand-dark mt-0.5">{selected.name}</p>
                </div>
                <div>
                  <span className="font-body text-[10px] font-bold text-earth-400 uppercase tracking-wider">Phone Number</span>
                  <p className="font-body text-sm font-bold text-brand-dark mt-0.5">{selected.phone || "—"}</p>
                </div>
              </div>
              <div>
                <span className="font-body text-[10px] font-bold text-earth-400 uppercase tracking-wider">Email Address</span>
                <p className="font-body text-sm font-bold text-brand-dark mt-0.5">{selected.email || "—"}</p>
              </div>
              <div>
                <span className="font-body text-[10px] font-bold text-earth-400 uppercase tracking-wider">Message Content</span>
                <p className="font-body text-xs text-brand-dark mt-1 leading-relaxed bg-[#FAF7F2] p-4 rounded-xl border border-earth-100 whitespace-pre-line">{selected.message}</p>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={`tel:${selected.phone}`} className="flex-1 btn-primary text-center text-xs py-2.5">Call Sender</a>
                <a href={`mailto:${selected.email}`} className="flex-1 btn-secondary text-center text-xs py-2.5">Email Sender</a>
                <button onClick={() => handleDelete(selected._id)} className="px-4 py-2.5 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 text-xs font-body font-semibold">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContacts;


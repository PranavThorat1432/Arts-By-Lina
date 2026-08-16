import { useState, useEffect } from "react";
import { testimonialService } from "../services/testimonialService";
import { formatDate } from "../utils/helpers";
import StarRating from "../components/common/StarRating";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";
import { MdDelete, MdCheckCircle, MdCancel } from "react-icons/md";
import AdminSubNav from "../components/admin/AdminSubNav";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchAll = async () => {
    try {
      const data = await testimonialService.getAll(filter || undefined);
      setTestimonials(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAll();
  }, [filter]);

  const handleStatus = async (id, status) => {
    try {
      const updated = await testimonialService.updateStatus(id, status);
      setTestimonials((prev) => prev.map((t) => (t._id === id ? updated : t)));
      toast.success(`Review ${status.toLowerCase()}`);
    } catch { toast.error("Failed to update"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await testimonialService.delete(id);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      toast.success("Deleted");
    } catch { toast.error("Failed to delete"); }
  };

  const statusColors = {
    Pending: "bg-amber-50 text-amber-700 border border-amber-200",
    Approved: "bg-green-50 text-green-700 border border-green-200",
    Rejected: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <div className="space-y-6">
      <AdminSubNav />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-brand-brown font-bold">Reviews & Testimonials</h1>
          <p className="font-body text-earth-500 text-sm mt-1">{testimonials.length} total customer reviews</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input-field w-auto text-xs py-2 px-3 border-brand-gold/30 focus:ring-1 focus:ring-brand-gold bg-white"
        >
          <option value="">All Statuses</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {loading ? <Loader /> : testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-earth-150 shadow-sm max-w-xl mx-auto">
          <p className="font-display text-2xl text-brand-brown font-bold">No reviews found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t._id} className="bg-white rounded-2xl border border-earth-150 shadow-sm p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-display text-lg text-brand-brown font-bold">{t.customerName}</p>
                    <StarRating rating={t.rating} size={13} className="mt-0.5" />
                  </div>
                  <span className={`font-body text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusColors[t.status] || statusColors.Pending}`}>
                    {t.status}
                  </span>
                </div>
                <p className="font-body text-xs text-earth-600 leading-relaxed mb-4 italic bg-[#FAF7F2] p-3 rounded-xl border border-earth-100/50">
                  "{t.reviewText}"
                </p>
              </div>
              <div>
                <p className="font-body text-[10px] text-earth-400 mb-4">Submitted {formatDate(t.createdAt)}</p>
                <div className="flex gap-2">
                  {t.status !== "Approved" && (
                    <button
                      onClick={() => handleStatus(t._id, "Approved")}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-green-200 rounded-lg text-green-600 hover:bg-green-50 text-[10px] font-body font-bold transition-colors"
                    >
                      <MdCheckCircle size={14} /> Approve
                    </button>
                  )}
                  {t.status !== "Rejected" && (
                    <button
                      onClick={() => handleStatus(t._id, "Rejected")}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-red-150 rounded-lg text-red-500 hover:bg-red-50/50 text-[10px] font-body font-bold transition-colors"
                    >
                      <MdCancel size={14} /> Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-1.5 border border-earth-200 rounded-lg text-earth-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                    title="Delete Review"
                  >
                    <MdDelete size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;


import { useState, useEffect } from "react";
import { bookingService } from "../services/bookingService";
import { formatDate } from "../utils/helpers";
import { BOOKING_STATUSES } from "../utils/constants";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";
import { MdDelete, MdVisibility, MdEventNote } from "react-icons/md";
import { FiX, FiFilter } from "react-icons/fi";
import AdminSubNav from "../components/admin/AdminSubNav";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchAll = async () => {
    try {
      const data = await bookingService.getAll(filter || undefined);
      setBookings(data);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAll();
  }, [filter]);

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await bookingService.updateStatus(id, status);
      setBookings((prev) => prev.map((b) => (b._id === id ? updated : b)));
      if (selected?._id === id) setSelected(updated);
      toast.success(`Booking status updated to ${status === "Accepted" ? "Confirmed" : status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await bookingService.delete(id);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success("Booking deleted successfully");
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Page Sub-navigation Tabs */}
      <AdminSubNav />

      {/* Title & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-brand-brown font-bold flex items-center gap-2">
            <MdEventNote className="text-brand-gold" size={28} />
            <span>Booking Management Console</span>
          </h1>
          <p className="font-body text-earth-500 text-xs mt-1">
            Review, confirm, schedule or cancel booking appointments.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="font-body text-xs font-bold text-earth-500 flex items-center gap-1">
            <FiFilter /> Filter:
          </span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field py-2 px-3 text-xs w-auto min-w-[145px] border-brand-gold/30 focus:ring-1 focus:ring-brand-gold bg-white"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <Loader />
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-earth-150 shadow-sm max-w-xl mx-auto">
          <p className="font-display text-2xl text-brand-brown font-bold mb-2">No Bookings Found</p>
          <p className="font-body text-earth-500 text-xs">
            There are no booking submissions matching this status filter.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-earth-150 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#FAF7F2] border-b border-earth-150">
                <tr>
                  {["Customer Detail", "Event Type", "Event Date", "Venue Location", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 font-body text-[11px] font-bold text-earth-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-100">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-brand-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-body text-sm font-bold text-brand-dark">{b.fullName}</p>
                      <p className="font-body text-xs text-earth-500">{b.mobileNumber} · {b.email}</p>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-brand-dark font-semibold">
                      {b.eventType}
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-earth-600">
                      {formatDate(b.eventDate)}
                    </td>
                    <td className="px-6 py-4 font-body text-xs text-earth-500 max-w-[200px] truncate" title={b.location}>
                      {b.location}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-body text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        b.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        b.status === "Accepted" ? "bg-teal-50 text-teal-700 border-teal-200" :
                        b.status === "Completed" ? "bg-green-50 text-green-700 border-green-200" :
                        "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {b.status === "Accepted" ? "Confirmed" : b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* View details */}
                        <button
                          onClick={() => setSelected(b)}
                          className="p-2 bg-brand-cream hover:bg-brand-gold hover:text-white rounded-lg text-brand-gold transition-all"
                          title="View Details"
                        >
                          <MdVisibility size={16} />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="p-2 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg text-red-500 transition-all"
                          title="Delete Booking"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-[#FAF7F2] px-6 py-3 border-t border-earth-150 flex items-center justify-between">
            <span className="font-body text-xs text-earth-500 font-bold">{bookings.length} Records found</span>
          </div>
        </div>
      )}

      {/* Booking Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-brand-brown/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-earth-150" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-earth-150 bg-[#FAF7F2]">
              <div>
                <h2 className="font-display text-xl text-brand-brown font-bold">Booking Details</h2>
                <p className="font-body text-earth-400 text-[10px] mt-0.5">Submitted on {formatDate(selected.createdAt)}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 hover:bg-earth-100 rounded-full text-earth-500 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 pb-2 border-b border-earth-50">
                <div>
                  <span className="font-body text-[10px] font-bold text-earth-400 uppercase tracking-wider">Customer Name</span>
                  <p className="font-body text-sm font-bold text-brand-dark mt-0.5">{selected.fullName}</p>
                </div>
                <div>
                  <span className="font-body text-[10px] font-bold text-earth-400 uppercase tracking-wider">Mobile Number</span>
                  <p className="font-body text-sm font-bold text-brand-dark mt-0.5">{selected.mobileNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-2 border-b border-earth-50">
                <div>
                  <span className="font-body text-[10px] font-bold text-earth-400 uppercase tracking-wider">Email Address</span>
                  <p className="font-body text-sm text-brand-dark mt-0.5">{selected.email}</p>
                </div>
                <div>
                  <span className="font-body text-[10px] font-bold text-earth-400 uppercase tracking-wider">Event Category</span>
                  <p className="font-body text-sm font-bold text-brand-dark mt-0.5">{selected.eventType}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-2 border-b border-earth-50">
                <div>
                  <span className="font-body text-[10px] font-bold text-earth-400 uppercase tracking-wider">Event Date</span>
                  <p className="font-body text-sm text-brand-dark mt-0.5">{formatDate(selected.eventDate)}</p>
                </div>
                <div>
                  <span className="font-body text-[10px] font-bold text-earth-400 uppercase tracking-wider">Current Status</span>
                  <div className="mt-1">
                    <span className={`font-body text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      selected.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      selected.status === "Accepted" ? "bg-teal-50 text-teal-700 border-teal-200" :
                      selected.status === "Completed" ? "bg-green-50 text-green-700 border-green-200" :
                      "bg-red-50 text-red-700 border-red-200"
                    }`}>
                      {selected.status === "Accepted" ? "Confirmed" : selected.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-body text-[10px] font-bold text-earth-400 uppercase tracking-wider">Venue Location / Address</span>
                <p className="font-body text-xs text-brand-dark mt-1 leading-relaxed bg-[#FAF7F2] p-3 rounded-xl border border-earth-100">{selected.location}</p>
              </div>

              {selected.additionalMessage && (
                <div>
                  <span className="font-body text-[10px] font-bold text-earth-400 uppercase tracking-wider">Customer Message</span>
                  <p className="font-body text-xs text-brand-dark mt-1 leading-relaxed bg-brand-cream/50 p-3 rounded-xl border border-earth-100 whitespace-pre-line">
                    {selected.additionalMessage}
                  </p>
                </div>
              )}

              {/* Status Update Control */}
              <div className="pt-3 border-t border-earth-100">
                <label className="label text-xs">Update Status</label>
                <select
                  value={selected.status}
                  onChange={(e) => handleStatusChange(selected._id, e.target.value)}
                  className="input-field text-sm mt-1 border-brand-gold/30"
                >
                  {BOOKING_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s === "Accepted" ? "Confirmed" : s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#FAF7F2] px-6 py-4 border-t border-earth-150 flex justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 border border-earth-300 rounded-lg font-body text-xs font-semibold text-earth-600 hover:bg-earth-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;


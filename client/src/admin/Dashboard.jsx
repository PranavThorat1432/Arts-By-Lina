import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdEventNote, MdPending, MdCheckCircle, MdPhotoLibrary,
  MdStar, MdMarkEmailUnread, MdAdd
} from "react-icons/md";
import { StatCard } from "../components/admin/StatCard";
import { bookingService } from "../services/bookingService";
import { testimonialService } from "../services/testimonialService";
import { contactService } from "../services/contactService";
import { galleryService } from "../services/galleryService";
import Loader from "../components/common/Loader";
import { formatDate } from "../utils/helpers";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [bookingsStats, testimonialsStats, contactsStats, gallery, allBookings] = await Promise.all([
          bookingService.getStats(),
          testimonialService.getStats(),
          contactService.getStats(),
          galleryService.getAll(),
          bookingService.getAll(),
        ]);

        setStats({
          bookings: bookingsStats,
          testimonials: testimonialsStats,
          contacts: contactsStats,
          galleryTotal: gallery.length,
        });

        setGalleryItems(gallery);

        // Sort bookings by date descending
        const sortedBookings = [...allBookings].sort(
          (a, b) => new Date(b.createdAt || b.eventDate) - new Date(a.createdAt || a.eventDate)
        );
        setRecentBookings(sortedBookings.slice(0, 5));

      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <Loader />;

  // Group gallery items by category to count them
  const categoryCounts = galleryItems.reduce((acc, item) => {
    if (item.category) {
      acc[item.category] = (acc[item.category] || 0) + 1;
    }
    return acc;
  }, {});

  // Status mapping for badges
  const statusColors = {
    Pending: "bg-amber-50 text-amber-700 border border-amber-200",
    Accepted: "bg-teal-50 text-teal-700 border border-teal-200",
    Completed: "bg-green-50 text-green-700 border border-green-200",
    Rejected: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-brand-brown font-bold">Dashboard Overview</h1>
        <p className="font-body text-earth-500 text-xs mt-1">Real-time statistics and quick actions</p>
      </div>

      {/* Metric Cards Row - 6 Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Bookings"
          value={stats?.bookings?.total}
          icon={MdEventNote}
          trend="+12%"
          trendType="up"
          subtitle="Lifetime requests"
        />
        <StatCard
          title="Pending Bookings"
          value={stats?.bookings?.pending}
          icon={MdPending}
          trend={stats?.bookings?.pending > 0 ? "Action" : "0 new"}
          trendType={stats?.bookings?.pending > 0 ? "info" : "up"}
          subtitle="Awaiting review"
        />
        <StatCard
          title="Completed"
          value={stats?.bookings?.completed}
          icon={MdCheckCircle}
          trend="+18%"
          trendType="up"
          subtitle="Successful events"
        />
        <StatCard
          title="Total Reviews"
          value={stats?.testimonials?.total}
          icon={MdStar}
          trend="+8%"
          trendType="up"
          subtitle="Customer reviews"
        />
        <StatCard
          title="Unread Messages"
          value={stats?.contacts?.unread}
          icon={MdMarkEmailUnread}
          trend={stats?.contacts?.unread > 0 ? "New" : "Clean"}
          trendType={stats?.contacts?.unread > 0 ? "down" : "up"}
          subtitle="Contact submissions"
        />
        <StatCard
          title="Gallery Designs"
          value={stats?.galleryTotal}
          icon={MdPhotoLibrary}
          trend={`+${galleryItems.filter(i => i.isFeatured).length} feat`}
          trendType="info"
          subtitle="Portfolio images"
        />
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Bookings Table (7/12 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-earth-150 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-earth-100 pb-3">
              <div>
                <h2 className="font-display text-xl text-brand-brown font-bold">Recent Bookings</h2>
                <p className="font-body text-earth-400 text-xs mt-0.5">Review the latest booking inquiries</p>
              </div>
              <Link
                to="/admin/bookings"
                className="font-body text-xs text-brand-gold font-bold hover:underline"
              >
                Manage All
              </Link>
            </div>

            {recentBookings.length === 0 ? (
              <div className="text-center py-10 font-body text-earth-400 text-sm">
                No recent bookings found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-earth-100">
                      <th className="font-body text-[11px] font-bold text-earth-500 uppercase pb-2">Customer</th>
                      <th className="font-body text-[11px] font-bold text-earth-500 uppercase pb-2">Date</th>
                      <th className="font-body text-[11px] font-bold text-earth-500 uppercase pb-2">Event</th>
                      <th className="font-body text-[11px] font-bold text-earth-500 uppercase pb-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-earth-50">
                    {recentBookings.map((b) => (
                      <tr key={b._id} className="hover:bg-brand-cream/40 transition-colors">
                        <td className="py-3 pr-2">
                          <p className="font-body text-xs font-bold text-brand-dark">{b.fullName}</p>
                          <p className="font-body text-[10px] text-earth-400">{b.mobileNumber}</p>
                        </td>
                        <td className="py-3 text-xs text-earth-600 font-body">{formatDate(b.eventDate)}</td>
                        <td className="py-3 text-xs text-earth-600 font-body">{b.eventType}</td>
                        <td className="py-3 text-right">
                          <span className={`font-body text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[b.status] || "bg-earth-100 text-earth-700"}`}>
                            {b.status === "Accepted" ? "Confirmed" : b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="mt-5 border-t border-earth-100 pt-4 flex justify-center">
            <Link
              to="/admin/bookings"
              className="btn-secondary w-full py-2.5 text-xs font-semibold rounded-lg hover:bg-brand-gold hover:text-white transition-all duration-300"
            >
              Go to Booking Management Console
            </Link>
          </div>
        </div>

        {/* Gallery Management & Categories (5/12 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-earth-150 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col mb-4 border-b border-earth-100 pb-3">
              <h2 className="font-display text-xl text-brand-brown font-bold">Gallery & Categories</h2>
              <p className="font-body text-earth-400 text-xs mt-0.5">Upload works and view category counts</p>
            </div>

            {/* Upload Button */}
            <button
              onClick={() => navigate("/admin/gallery")}
              className="btn-primary w-full py-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 mb-6"
            >
              <MdAdd size={16} />
              <span>Upload New Design</span>
            </button>

            {/* Categories List */}
            <div>
              <h3 className="font-body text-xs font-bold text-earth-500 uppercase tracking-wide mb-3">Portfolio Segments</h3>
              <div className="space-y-2.5">
                {Object.entries(categoryCounts).length === 0 ? (
                  <div className="text-center py-4 font-body text-earth-400 text-xs">
                    No designs uploaded yet.
                  </div>
                ) : (
                  Object.entries(categoryCounts).map(([cat, count]) => (
                    <div
                      key={cat}
                      onClick={() => navigate("/admin/gallery")}
                      className="flex items-center justify-between p-3 bg-brand-cream/50 hover:bg-brand-cream rounded-xl border border-earth-100 cursor-pointer transition-colors"
                    >
                      <span className="font-body text-xs font-bold text-brand-dark">{cat}</span>
                      <span className="font-body text-[10px] font-bold bg-brand-gold/15 text-brand-gold px-2.5 py-0.5 rounded-full">
                        {count} {count === 1 ? 'Design' : 'Designs'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-earth-100 pt-4">
            <Link
              to="/admin/gallery"
              className="font-body text-xs text-brand-gold font-bold hover:underline block text-center"
            >
              Manage Complete Gallery Portfolio →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

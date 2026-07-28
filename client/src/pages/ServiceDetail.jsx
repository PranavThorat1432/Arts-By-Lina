import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { serviceService } from "../services/serviceService";
import { galleryService } from "../services/galleryService";
import { bookingService } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/helpers";
import Loader from "../components/common/Loader";
import GalleryCard from "../components/gallery/GalleryCard";
import GalleryModal from "../components/gallery/GalleryModal";
import toast from "react-hot-toast";
import { MdEdit, MdDelete, MdArrowBack } from "react-icons/md";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAuth();

  const [service, setService] = useState(null);
  const [relatedDesigns, setRelatedDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    eventDate: "",
    location: "",
    additionalMessage: "",
  });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true);
      try {
        const serviceData = await serviceService.getById(id);
        setService(serviceData);
        setBookingForm((prev) => ({
          ...prev,
          additionalMessage: `Interested in booking: "${serviceData.name}"`,
        }));

        // Fetch related designs from Gallery matching category
        if (serviceData.name) {
          const galleryData = await galleryService.getAll();
          // Filter by category (case-insensitive match or contains)
          const related = galleryData
            .filter((item) => item.category?.toLowerCase() === serviceData.name?.toLowerCase() || serviceData.description?.toLowerCase().includes(item.category?.toLowerCase()))
            .slice(0, 4);
          setRelatedDesigns(related);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingSubmitting(true);
    try {
      // Map eventType to a valid database enum
      const lowerName = service.name?.toLowerCase() || "";
      let mappedEventType = "Other";
      if (lowerName.includes("bridal")) mappedEventType = "Bridal";
      else if (lowerName.includes("engagement")) mappedEventType = "Engagement";
      else if (lowerName.includes("festival")) mappedEventType = "Festival";
      else if (lowerName.includes("party")) mappedEventType = "Party";
      else if (lowerName.includes("corporate")) mappedEventType = "Corporate";

      // Prefix the service name to the booking message so the admin is guaranteed to see it
      const servicePrefix = `[Service: ${service.name}]`;
      const finalMessage = bookingForm.additionalMessage?.startsWith(servicePrefix)
        ? bookingForm.additionalMessage
        : `${servicePrefix} ${bookingForm.additionalMessage || ""}`.trim();

      const payload = {
        ...bookingForm,
        eventType: mappedEventType,
        additionalMessage: finalMessage,
      };
      await bookingService.create(payload);
      setBookingSubmitted(true);
      toast.success("Booking request submitted successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit booking request.");
    } finally {
      setBookingSubmitting(false);
    }
  };

  const handleDeleteService = async () => {
    if (!window.confirm(`Are you sure you want to delete the service "${service.name}"?`)) return;
    try {
      await serviceService.delete(id);
      toast.success("Service deleted successfully");
      navigate("/services");
    } catch (err) {
      toast.error("Failed to delete service");
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-cream-50">
        <Loader />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center bg-cream-50 text-center px-4">
        <h2 className="font-display text-3xl text-earth-900 font-bold mb-4">Service Not Found</h2>
        <p className="font-body text-earth-500 mb-6">The service details could not be retrieved.</p>
        <Link to="/services" className="btn-primary flex items-center gap-2">
          <MdArrowBack size={18} /> Back to Services
        </Link>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="pt-20 bg-cream-50 min-h-screen">
      {/* Admin Quick Action Bar */}
      {admin && (
        <div className="bg-earth-900 text-white py-3 px-4 shadow-md sticky top-20 z-30">
          <div className="page-container flex items-center justify-between flex-wrap gap-3">
            <span className="font-body text-sm text-gold-300 font-semibold">
              Logged in as Admin — Shortcuts:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/admin/services", { state: { editItem: service } })}
                className="flex items-center gap-1.5 bg-gold-600 hover:bg-gold-500 px-4 py-1.5 rounded-lg text-white font-body text-xs font-semibold transition-colors"
              >
                <MdEdit size={14} /> Edit Service
              </button>
              <button
                onClick={handleDeleteService}
                className="flex items-center gap-1.5 bg-red-700 hover:bg-red-600 px-4 py-1.5 rounded-lg text-white font-body text-xs font-semibold transition-colors"
              >
                <MdDelete size={14} /> Delete Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <section className="bg-earth-950 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/20 to-transparent" />
        <div className="relative z-10 page-container">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-brand-gold hover:opacity-90 transition-colors font-body text-sm mb-4">
            <MdArrowBack size={16} /> Back to All Services
          </Link>
          <h1 className="font-display text-4xl md:text-5xl text-cream-50 font-semibold leading-tight">
            {service.name}
          </h1>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="py-12 md:py-16">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image & Related designs */}
            <div className="lg:col-span-7 space-y-8">
              {/* Main Image */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-earth-100 p-3">
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-earth-50">
                  <img
                    src={service.image?.url || "/placeholder-service.jpg"}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Related Gallery Designs */}
              {relatedDesigns.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md border border-earth-100 p-6 md:p-8">
                  <h3 className="font-display text-xl md:text-2xl text-earth-900 font-semibold mb-2">
                    Recent {service.name} Portfolio
                  </h3>
                  <p className="font-body text-earth-500 text-sm mb-6">
                    See some of our actual works matching this service category.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {relatedDesigns.map((item) => (
                      <GalleryCard
                        key={item._id}
                        item={item}
                        onClick={setSelectedGalleryItem}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Pricing, Description & Inline Booking */}
            <div className="lg:col-span-5 space-y-8">
              {/* Service Intro */}
              <div className="bg-white rounded-2xl shadow-md border border-earth-100 p-6 md:p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="font-display text-xs tracking-wider text-earth-400 uppercase font-semibold">
                    Starting Package Rate
                  </span>
                  <span className="font-body text-brand-gold font-extrabold text-lg bg-brand-cream border border-earth-150 px-4 py-1.5 rounded-full">
                    {formatPrice(service.startingPrice)}+
                  </span>
                </div>
                <h2 className="font-display text-2xl text-earth-900 font-bold mb-4">{service.name}</h2>
                <div className="w-10 h-0.5 bg-brand-gold mb-5" />
                <p className="font-body text-earth-600 text-sm leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>

              {/* Inline Booking Form */}
              <div className="bg-white rounded-2xl shadow-md border border-earth-100 p-6 md:p-8">
                {bookingSubmitted ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-600 text-3xl">✓</span>
                    </div>
                    <h3 className="font-display text-xl text-earth-900 font-bold mb-2">
                      Booking Request Received!
                    </h3>
                    <p className="font-body text-earth-600 text-xs leading-relaxed mb-6">
                      Thank you! We have received your booking request for **{service.name}** and will reach out shortly to confirm details.
                    </p>
                    <button
                      onClick={() => setBookingSubmitted(false)}
                      className="btn-primary text-xs py-2 px-6"
                    >
                      Book Again
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-xl text-earth-900 font-semibold mb-1">
                      Book This Service
                    </h3>
                    <p className="font-body text-earth-400 text-xs mb-6">
                      Request an appointment slot for {service.name} right now.
                    </p>
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <label className="label text-xs">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={bookingForm.fullName}
                          onChange={handleBookingChange}
                          placeholder="Your full name"
                          className="input-field py-2 text-sm"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="label text-xs">Mobile Number *</label>
                          <input
                            type="tel"
                            name="mobileNumber"
                            value={bookingForm.mobileNumber}
                            onChange={handleBookingChange}
                            placeholder="Mobile number"
                            className="input-field py-2 text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="label text-xs">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={bookingForm.email}
                            onChange={handleBookingChange}
                            placeholder="Email address"
                            className="input-field py-2 text-sm"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="label text-xs">Event Date *</label>
                          <input
                            type="date"
                            name="eventDate"
                            value={bookingForm.eventDate}
                            onChange={handleBookingChange}
                            min={today}
                            className="input-field py-2 text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="label text-xs">Event Type (Fixed)</label>
                          <input
                            type="text"
                            value={service.name || ""}
                            className="input-field py-2 text-sm bg-earth-50 text-earth-500 cursor-not-allowed font-semibold"
                            disabled
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label text-xs">Location/Venue Address *</label>
                        <input
                          type="text"
                          name="location"
                          value={bookingForm.location}
                          onChange={handleBookingChange}
                          placeholder="Event location or home address"
                          className="input-field py-2 text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="label text-xs">Additional Message</label>
                        <textarea
                          name="additionalMessage"
                          value={bookingForm.additionalMessage}
                          onChange={handleBookingChange}
                          placeholder="Special design patterns or constraints..."
                          rows={3}
                          className="input-field py-2 text-sm resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={bookingSubmitting}
                        className="btn-primary w-full py-3 text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {bookingSubmitting ? "Submitting Request..." : "Request Booking"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox for Related Portfolio Items */}
      {selectedGalleryItem && (
        <GalleryModal
          item={selectedGalleryItem}
          onClose={() => setSelectedGalleryItem(null)}
        />
      )}
    </div>
  );
};

export default ServiceDetail;

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { bookingService } from "../services/bookingService";
import { EVENT_TYPES } from "../utils/constants";
import { useSettings } from "../hooks/useSettings";
import toast from "react-hot-toast";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import placeholderHand from "../assets/placeholder-about.jpg"; // Fallback image

const Booking = () => {
  const location = useLocation();
  const state = location.state || {};
  const { settings } = useSettings();

  const getMappedEventType = (type) => {
    if (!type) return "";
    const lower = type.toLowerCase();
    if (lower.includes("bridal")) return "Bridal";
    if (lower.includes("engagement")) return "Engagement";
    if (lower.includes("festival")) return "Festival";
    if (lower.includes("party")) return "Party";
    if (lower.includes("corporate")) return "Corporate";
    return "Other";
  };

  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    eventType: getMappedEventType(state.eventType),
    eventDate: "",
    location: "",
    additionalMessage: state.serviceName
      ? `I'm interested in booking the "${state.serviceName}" service.`
      : "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let finalForm = { ...form };
      if (state.serviceName) {
        const servicePrefix = `[Service: ${state.serviceName}]`;
        finalForm.additionalMessage = form.additionalMessage?.startsWith(servicePrefix)
          ? form.additionalMessage
          : `${servicePrefix} ${form.additionalMessage || ""}`.trim();
      }

      await bookingService.create(finalForm);
      setSubmitted(true);
      toast.success("Booking request submitted!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit booking.");
    } finally {
      setSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD for min date
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="pt-20 bg-[#FEFAF0]">
      {/* Banner */}
      <section className="bg-[#FAF7F2] py-14 text-center border-b border-earth-100 relative overflow-hidden">
        <div className="relative z-10 page-container">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-brand-gold font-bold mb-3">
            Reserve Your Slot
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-brand-brown font-bold">
            Book Your Appointment
          </h1>
          <div className="w-10 h-0.5 bg-brand-gold mx-auto mt-4" />
          <p className="font-body text-earth-500 text-xs md:text-sm mt-4">
            Reserve your slot for an unforgettable Mehndi experience
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12 md:py-16">
        <div className="page-container">
          {submitted ? (
            <div className="bg-white rounded-2xl shadow-md border border-earth-100 p-12 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-brand-brown font-bold mb-3">
                Booking Request Received!
              </h2>
              <p className="font-body text-earth-600 text-sm mb-8 leading-relaxed">
                Thank you for reaching out! We have received your booking request and will contact you shortly to confirm your appointment.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    fullName: "",
                    mobileNumber: "",
                    email: "",
                    eventType: "",
                    eventDate: "",
                    location: "",
                    additionalMessage: "",
                  });
                }}
                className="btn-primary px-8 py-3 rounded-full text-sm font-semibold"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Image Card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-earth-150 p-3">
                  <div className="aspect-[4/3] md:aspect-square overflow-hidden rounded-xl bg-earth-50 relative group">
                    <img
                      src={placeholderHand}
                      alt="Timeless artistry, crafted by hand"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                      <p className="font-display text-white text-xl md:text-2xl font-bold">
                        Timeless artistry, crafted by hand
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service Area Pill */}
                <div className="bg-white rounded-2xl shadow-sm border border-earth-150 p-5 flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-gold shrink-0">
                    <FiMapPin size={18} />
                  </div>
                  <div>
                    <p className="font-body text-xs text-earth-600 font-semibold leading-relaxed">
                      {settings?.serviceAreaText || "Serving Jalgaon & surrounding areas · Home & Venue visits available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl shadow-md border border-earth-100 p-6 md:p-8">
                  <h2 className="font-display text-2xl text-brand-brown font-bold mb-1">
                    Booking Details
                  </h2>
                  <p className="font-body text-earth-400 text-xs mb-6">
                    Fill in your details and we'll confirm your slot
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label text-xs">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="input-field py-2.5 text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="label text-xs">Phone Number *</label>
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={form.mobileNumber}
                          onChange={handleChange}
                          placeholder="+91 00000 00000"
                          className="input-field py-2.5 text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label text-xs">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className="input-field py-2.5 text-sm"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label text-xs">Event Type *</label>
                        <select
                          name="eventType"
                          value={form.eventType}
                          onChange={handleChange}
                          className="input-field py-2.5 text-sm"
                          required
                        >
                          <option value="">Select event type</option>
                          {EVENT_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label text-xs">Event Date *</label>
                        <input
                          type="date"
                          name="eventDate"
                          value={form.eventDate}
                          onChange={handleChange}
                          min={today}
                          className="input-field py-2.5 text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label text-xs">Location / Address *</label>
                      <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Venue or home address"
                        className="input-field py-2.5 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="label text-xs">Additional Notes</label>
                      <textarea
                        name="additionalMessage"
                        value={form.additionalMessage}
                        onChange={handleChange}
                        placeholder="Tell us about your design preferences, number of people, timing..."
                        rows={4}
                        className="input-field py-2.5 text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full py-3.5 text-sm font-semibold rounded-lg shadow-sm transition-all duration-300 hover:bg-brand-gold/90"
                    >
                      {submitting ? "Confirming..." : "Confirm Booking"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-16 bg-[#FAF7F2] border-t border-b border-earth-100">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-brand-brown font-bold">
              Get in Touch
            </h2>
            <div className="w-10 h-0.5 bg-brand-gold mx-auto mt-4" />
            <p className="font-body text-earth-500 text-xs mt-3">We'd love to hear from you</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Phone */}
            <a
              href={settings?.phoneNumber ? `tel:${settings.phoneNumber}` : "#"}
              className="bg-white rounded-2xl p-6 shadow-sm border border-earth-100 text-center flex flex-col items-center space-y-3 hover:shadow-md hover:border-brand-gold transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                <FiPhone size={18} />
              </div>
              <span className="font-display text-sm text-brand-brown font-bold">Phone</span>
              <p className="font-body text-xs text-earth-600 font-semibold truncate w-full group-hover:text-brand-gold transition-colors">
                {settings?.phoneNumber || "+91 98765 43210"}
              </p>
            </a>

            {/* Email */}
            <a
              href={settings?.contactEmail ? `mailto:${settings.contactEmail}` : "#"}
              className="bg-white rounded-2xl p-6 shadow-sm border border-earth-100 text-center flex flex-col items-center space-y-3 hover:shadow-md hover:border-brand-gold transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                <FiMail size={18} />
              </div>
              <span className="font-display text-sm text-brand-brown font-bold">Email</span>
              <p className="font-body text-xs text-earth-600 font-semibold truncate w-full group-hover:text-brand-gold transition-colors">
                {settings?.contactEmail || "hello@artsbylina.com"}
              </p>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${(settings?.whatsappNumber || "919876543210").replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-sm border border-earth-100 text-center flex flex-col items-center space-y-3 hover:shadow-md hover:border-brand-gold transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                <FaWhatsapp size={20} />
              </div>
              <span className="font-display text-sm text-brand-brown font-bold">WhatsApp</span>
              <p className="font-body text-xs text-earth-600 font-semibold truncate w-full group-hover:text-brand-gold transition-colors">
                {settings?.whatsappNumber || "+91 98765 43210"}
              </p>
              <span className="font-body text-[10px] text-brand-gold font-bold group-hover:underline">
                Chat Now
              </span>
            </a>

            {/* Instagram */}
            <a
              href={settings?.instagramURL || "https://instagram.com/artsbyLina"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-sm border border-earth-100 text-center flex flex-col items-center space-y-3 hover:shadow-md hover:border-brand-gold transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                <FaInstagram size={20} />
              </div>
              <span className="font-display text-sm text-brand-brown font-bold">Instagram</span>
              <p className="font-body text-xs text-earth-600 font-semibold truncate w-full group-hover:text-brand-gold transition-colors">
                {settings?.instagramURL ? `@${settings.instagramURL.split("/").pop()}` : "@artsbyLina"}
              </p>
              <span className="font-body text-[10px] text-brand-gold font-bold group-hover:underline">
                Follow Us
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Service Area Banner */}
      <section className="py-8 bg-white border-b border-earth-100">
        <div className="page-container max-w-4xl flex items-center gap-4 p-4 border border-earth-150 rounded-2xl bg-[#FAF7F2]/50">
          <div className="w-10 h-10 bg-brand-gold text-white rounded-full flex items-center justify-center shrink-0">
            <FiMapPin size={20} />
          </div>
          <div>
            <h4 className="font-display text-base text-brand-brown font-bold">Service Area</h4>
            <p className="font-body text-earth-500 text-xs mt-1 leading-relaxed">
              {settings?.serviceAreaText ||
                "Serving all areas across Jalgaon city — Home visits, Venue visits & Appointment-based visits available."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;

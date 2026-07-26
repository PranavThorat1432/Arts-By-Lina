import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { contactService } from "../services/contactService";
import { useSettings } from "../hooks/useSettings";
import { getWhatsAppURL } from "../utils/helpers";
import { WHATSAPP_MESSAGE } from "../utils/constants";
import toast from "react-hot-toast";

const Contact = () => {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const whatsappURL = settings?.whatsappNumber
    ? getWhatsAppURL(settings.whatsappNumber, WHATSAPP_MESSAGE)
    : "#";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await contactService.create(form);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Banner */}
      <section className="bg-earth-950 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/20 to-transparent" />
        <div className="relative z-10 page-container">
          <p className="section-subtitle text-brand-gold mb-3">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-7xl text-cream-50 font-semibold">Contact Us</h1>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-5" />
        </div>
      </section>

      <section className="section-padding bg-cream-50">
        <div className="page-container grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="section-title mb-4">Let's Connect</h2>
            <div className="w-16 h-0.5 bg-brand-gold mb-6" />
            <p className="font-body text-earth-600 leading-relaxed mb-8">
              Have a question or ready to book? Reach out via any of the channels below. We're here to help make your occasion memorable.
            </p>

            <div className="space-y-5">
              {settings?.phoneNumber && (
                <a href={`tel:${settings.phoneNumber}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-brand-cream border border-earth-150 rounded-xl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                    <FaPhone size={18} />
                  </div>
                  <div>
                    <p className="font-body text-xs text-earth-500 font-semibold uppercase tracking-wide">Phone</p>
                    <p className="font-body text-earth-800 font-semibold group-hover:text-brand-gold transition-colors">{settings.phoneNumber}</p>
                  </div>
                </a>
              )}

              {settings?.contactEmail && (
                <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-brand-cream border border-earth-150 rounded-xl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <p className="font-body text-xs text-earth-500 font-semibold uppercase tracking-wide">Email</p>
                    <p className="font-body text-earth-800 font-semibold group-hover:text-brand-gold transition-colors">{settings.contactEmail}</p>
                  </div>
                </a>
              )}

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-cream border border-earth-150 rounded-xl flex items-center justify-center text-brand-gold">
                  <FaMapMarkerAlt size={18} />
                </div>
                <div>
                  <p className="font-body text-xs text-earth-500 font-semibold uppercase tracking-wide">Location</p>
                  <p className="font-body text-earth-800 font-semibold">{settings?.serviceAreaText || "Jalgaon, Maharashtra"}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              {settings?.whatsappNumber && (
                <a
                  href={whatsappURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-body text-sm font-semibold transition-colors"
                >
                  <FaWhatsapp size={18} /> WhatsApp
                </a>
              )}
              {settings?.instagramURL && (
                <a
                  href={settings.instagramURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-5 py-3 rounded-lg font-body text-sm font-semibold transition-opacity"
                >
                  <FaInstagram size={18} /> Instagram
                </a>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="font-display text-2xl text-earth-900 font-semibold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label">Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="input-field" required />
              </div>
              <div>
                <label className="label">Phone Number *</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone number" className="input-field" required />
              </div>
              <div>
                <label className="label">Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your email address" className="input-field" required />
              </div>
              <div>
                <label className="label">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" rows={4} className="input-field resize-none" required />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

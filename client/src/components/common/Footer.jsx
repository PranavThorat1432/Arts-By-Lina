import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useSettings } from "../../hooks/useSettings";
import { getWhatsAppURL } from "../../utils/helpers";
import { WHATSAPP_MESSAGE as WA_MSG } from "../../utils/constants";

const Footer = () => {
  const { settings } = useSettings();

  const whatsappURL = settings?.whatsappNumber
    ? getWhatsAppURL(settings.whatsappNumber, WA_MSG)
    : "#";

  return (
    <footer className="bg-earth-950 text-cream-100">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-accent text-3xl text-gold-400 mb-2">Arts by Lina</h3>
            <p className="font-body text-cream-300 text-sm mb-4 italic">
              {settings?.tagline || "Crafting Beautiful Mehndi Memories"}
            </p>
            <p className="font-body text-cream-400 text-sm leading-relaxed max-w-xs">
              Professional Mehndi artist based in Jalgaon, Maharashtra. Bringing beautiful Mehndi art to your special moments.
            </p>
            <div className="flex gap-4 mt-5">
              {settings?.instagramURL && (
                <a
                  href={settings.instagramURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-400 hover:text-gold-400 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={22} />
                </a>
              )}
              {settings?.whatsappNumber && (
                <a
                  href={whatsappURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-400 hover:text-green-400 transition-colors"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={22} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-gold-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/gallery", label: "Gallery" },
                { to: "/testimonials", label: "Testimonials" },
                { to: "/booking", label: "Book Appointment" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body text-sm text-cream-400 hover:text-gold-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg text-gold-400 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gold-500 mt-0.5 shrink-0" />
                <span className="font-body text-sm text-cream-400">
                  {settings?.serviceAreaText || "Jalgaon, Maharashtra"}
                </span>
              </li>
              {settings?.phoneNumber && (
                <li className="flex items-center gap-3">
                  <FaPhone className="text-gold-500 shrink-0" />
                  <a
                    href={`tel:${settings.phoneNumber}`}
                    className="font-body text-sm text-cream-400 hover:text-gold-400 transition-colors"
                  >
                    {settings.phoneNumber}
                  </a>
                </li>
              )}
              {settings?.contactEmail && (
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-gold-500 shrink-0" />
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="font-body text-sm text-cream-400 hover:text-gold-400 transition-colors"
                  >
                    {settings.contactEmail}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-earth-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cream-500">
            © {new Date().getFullYear()} Arts by Lina. All rights reserved.
          </p>
          <Link to="/contact" className="font-body text-xs text-cream-500 hover:text-gold-400 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

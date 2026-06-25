import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import { useSettings } from "../../hooks/useSettings";
import { getWhatsAppURL } from "../../utils/helpers";
import { WHATSAPP_MESSAGE } from "../../utils/constants";

// Import the 4 uploaded hero images with correct names and extensions
import hero1 from "../../assets/hero 1.jpg";
import hero2 from "../../assets/hero 2.jpeg";
import hero3 from "../../assets/hero 3.jpg";
import hero4 from "../../assets/hero 4.png";

const HERO_IMAGES = [hero1, hero2, hero3, hero4];

const HeroSection = () => {
  const { settings } = useSettings();
  const [activeSlide, setActiveSlide] = useState(0);

  const whatsappURL = settings?.whatsappNumber
    ? getWhatsAppURL(settings.whatsappNumber, WHATSAPP_MESSAGE)
    : "#";

  // Auto-slide effect every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-brown">
      {/* Background Slideshow with cross-fade & zoom effect */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1500ms] ease-in-out ${
              index === activeSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      {/* Dark Warm Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F110B]/85 via-[#1F110B]/65 to-[#1F110B]/90 z-10" />

      {/* Decorative Brand Borders */}
      <div className="absolute inset-4 md:inset-8 border border-[#C2A26F]/20 rounded-2xl pointer-events-none z-10" />
      <div className="absolute inset-6 md:inset-10 border border-[#C2A26F]/5 rounded-2xl pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto space-y-6">
        <p className="font-accent text-[#C2A26F] text-3xl md:text-4xl lg:text-5xl animate-fade-in tracking-wide italic">
          Welcome to
        </p>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-[#EAE1D4] to-[#C2A26F] leading-tight select-none">
          {settings?.businessName || "Arts by Lina"}
        </h1>

        {/* Elegant Gold Divider */}
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C2A26F]" />
          <div className="w-2.5 h-2.5 rotate-45 border border-[#C2A26F] bg-transparent" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C2A26F]" />
        </div>

        <p className="font-body text-[#FEFAF0]/85 text-sm md:text-base max-w-xl mx-auto leading-relaxed tracking-[0.2em] font-light uppercase">
          {settings?.tagline || "Crafting Beautiful Mehndi Memories"}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 max-w-2xl mx-auto">
          {/* Book Appointment (Accent Pink) */}
          <Link
            to="/booking"
            className="group w-full sm:w-auto bg-[#E21C5A] hover:bg-[#c1154a] text-white px-8 py-4 rounded-full font-body font-semibold text-xs tracking-widest uppercase transition-all duration-305 transform hover:scale-[1.03] hover:shadow-lg hover:shadow-[#E21C5A]/25 flex items-center justify-center gap-2"
          >
            <FaCalendarAlt size={13} className="group-hover:scale-110 transition-transform" />
            <span>Book Appointment</span>
          </Link>

          {/* Contact Us (Outline Gold) */}
          <Link
            to="/contact"
            className="w-full sm:w-auto border border-[#C2A26F] text-[#FEFAF0] hover:bg-[#C2A26F] hover:text-[#1F110B] px-8 py-4 rounded-full font-body font-semibold text-xs tracking-widest uppercase transition-all duration-305 transform hover:scale-[1.03] flex items-center justify-center gap-2 bg-transparent"
          >
            <FaEnvelope size={13} />
            <span>Contact Us</span>
          </Link>

          {/* WhatsApp Chat (WhatsApp Green) */}
          <a
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 rounded-full font-body font-semibold text-xs tracking-widest uppercase transition-all duration-305 transform hover:scale-[1.03] hover:shadow-lg hover:shadow-[#25D366]/20 flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={15} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#C2A26F]/60 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#C2A26F]" />
      </div>
    </section>
  );
};

export default HeroSection;


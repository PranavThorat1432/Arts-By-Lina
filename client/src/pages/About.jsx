import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../hooks/useSettings";
import { testimonialService } from "../services/testimonialService";
import { formatDate } from "../utils/helpers";
import about from "../assets/about.png";
import { FiAward, FiFeather, FiTarget, FiHeart } from "react-icons/fi";
import StarRating from "../components/common/StarRating";

const cards = [
  {
    icon: FiAward,
    title: "Experience",
    desc: "Over 8 years of crafting timeless Mehndi for weddings and festivals.",
  },
  {
    icon: FiFeather,
    title: "Specialization",
    desc: "Bridal, Arabic, and contemporary intricate henna design styles.",
  },
  {
    icon: FiTarget,
    title: "Mission",
    desc: "To make every bride feel radiant with artistry rooted in tradition.",
  },
  {
    icon: FiHeart,
    title: "Why Clients Trust Us",
    desc: "Premium organic henna, hygiene-first care, and lasting rich color.",
  },
];

const staticTestimonials = [
  {
    name: "Priya Sharma",
    date: "March 2024",
    stars: 5,
    text: "Lina's bridal Mehndi was absolutely breathtaking. The detail and color were beyond my dreams — I felt like a queen on my big day.",
  },
  {
    name: "Aisha Khan",
    date: "January 2024",
    stars: 5,
    text: "So patient and talented! The design lasted weeks with the richest color. Highly recommend Arts by Lina for any celebration.",
  },
  {
    name: "Meera Patel",
    date: "December 2023",
    stars: 5,
    text: "An artist with a gentle soul and a steady hand. Every guest at my engagement asked who did my henna. Simply stunning work.",
  },
];

const About = () => {
  const { settings } = useSettings();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    testimonialService.getApproved()
      .then((data) => {
        // Show the latest 3 approved testimonials
        setTestimonials(data.slice(0, 3));
      })
      .catch((err) => {
        console.error("Failed to fetch dynamic testimonials:", err);
      });
  }, []);

  const displayedTestimonials = testimonials.length > 0 ? testimonials : staticTestimonials;

  return (
    <div className="pt-20 bg-[#FEFAF0]">
      {/* Banner */}
      <section className="bg-[#FAF7F2] py-14 text-center border-b border-earth-100 relative overflow-hidden">
        <div className="relative z-10 page-container">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-brand-gold font-bold mb-3">
            Get To Know Me
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-brand-brown font-bold">
            About Lina
          </h1>
          <div className="w-10 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>
      </section>

      {/* Main Profile Section */}
      <section className="py-16 md:py-24">
        <div className="page-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image with Mockup Gold Border Frame */}
          <div className="lg:col-span-5 px-4 md:px-8">
            <div className="relative border-4 border-brand-gold/30 p-2.5 rounded-3xl bg-white shadow-lg max-w-sm mx-auto lg:max-w-none">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-earth-50">
                <img src={about} alt="Lina - Mehndi Artist" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right: Intro & Metrics */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div>
              <h2 className="font-display text-4xl text-brand-brown font-bold mb-2">Lina</h2>
              <p className="font-body text-sm font-semibold text-brand-gold tracking-wide">
                Professional Mehndi Artist · Jalgaon, Maharashtra
              </p>
            </div>
            
            <p className="font-body text-brand-dark/80 text-sm leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {settings?.aboutContent ||
                "My journey with Mehndi began over eight years ago as a quiet passion that blossomed into a lifelong art. Each design I create tells a story — intricate, intentional, and deeply personal. From radiant brides to joyful celebrations, I pour elegance and tradition into every delicate stroke."}
            </p>

            {/* Metrics Pills */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 pt-2">
              {[
                { value: "500+", label: "Brides" },
                { value: "8+", label: "Years Experience" },
                { value: "100%", label: "Satisfaction" },
              ].map((pill) => (
                <div key={pill.label} className="border border-brand-gold/30 bg-white rounded-xl py-3 px-2 text-center shadow-sm">
                  <p className="font-display text-xl md:text-2xl font-bold text-brand-brown">{pill.value}</p>
                  <p className="font-body text-[10px] text-earth-600 font-semibold mt-0.5">{pill.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link to="/booking" className="btn-accent px-8 py-3.5 rounded-full font-semibold text-sm inline-flex items-center gap-2">
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Key Features */}
      <section className="py-16 bg-[#FAF7F2] border-t border-b border-earth-100">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="bg-white rounded-2xl p-6 shadow-sm border border-earth-100 text-center flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center text-brand-gold">
                    <Icon size={22} />
                  </div>
                  <h4 className="font-display text-lg text-brand-brown font-bold">{card.title}</h4>
                  <p className="font-body text-earth-500 text-xs leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="page-container">
          <div className="text-center mb-12">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-brand-gold font-bold mb-3">
              Testimonials
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-brand-brown font-bold">
              What Our Clients Say
            </h2>
            <div className="w-10 h-0.5 bg-brand-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedTestimonials.map((t, idx) => {
              const name = t.customerName || t.name;
              const rating = t.rating || t.stars || 5;
              const text = t.reviewText || t.text;
              const date = t.createdAt ? formatDate(t.createdAt) : t.date;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-earth-100 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Stars */}
                    <StarRating rating={rating} size={14} />
                    <p className="font-body text-brand-dark/80 text-sm leading-relaxed italic">
                      "{text}"
                    </p>
                  </div>
                  <div className="pt-2 border-t border-earth-100 flex justify-between items-center">
                    <span className="font-display text-sm font-bold text-brand-brown">{name}</span>
                    <span className="font-body text-[10px] text-earth-400 font-semibold">{date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/testimonials" className="font-body text-xs font-bold text-brand-gold hover:text-brand-gold/80 transition-colors inline-flex items-center gap-1">
              ✍ Share Your Experience
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;


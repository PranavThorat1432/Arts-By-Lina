import { useState, useEffect } from "react";
import { testimonialService } from "../services/testimonialService";
import TestimonialCard from "../components/testimonials/TestimonialCard";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ customerName: "", rating: 5, reviewText: "" });
  const [submitting, setSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    testimonialService.getApproved().then((data) => {
      setTestimonials(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName || !form.reviewText) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      await testimonialService.create(form);
      toast.success("Thank you! Your review will appear after approval.");
      setForm({ customerName: "", rating: 5, reviewText: "" });
    } catch {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Banner */}
      <section className="bg-earth-950 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-maroon-900/40 to-transparent" />
        <div className="relative z-10 page-container">
          <p className="section-subtitle text-gold-400 mb-3">What Clients Say</p>
          <h1 className="font-display text-5xl md:text-7xl text-cream-50 font-semibold">Testimonials</h1>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-5" />
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding bg-cream-50">
        <div className="page-container">
          {loading ? <Loader /> : testimonials.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-3xl text-earth-400">No reviews yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <TestimonialCard key={t._id} testimonial={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Submit Review Form */}
      <section className="section-padding bg-cream-100">
        <div className="page-container max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-subtitle mb-3">Share Your Experience</p>
            <h2 className="section-title">Leave a Review</h2>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
            <div className="mb-5">
              <label className="label">Your Name *</label>
              <input
                type="text"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                placeholder="Enter your name"
                className="input-field"
                required
              />
            </div>

            <div className="mb-5">
              <label className="label text-xs">Your Rating *</label>
              <div className="flex gap-2.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, rating: star }))}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-4xl transition-all duration-150 transform hover:scale-110 active:scale-95 cursor-pointer ${
                      star <= (hoverRating || form.rating) ? "text-[#FFB800]" : "text-earth-200"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="label">Your Review *</label>
              <textarea
                name="reviewText"
                value={form.reviewText}
                onChange={handleChange}
                placeholder="Share your experience..."
                rows={4}
                className="input-field resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;

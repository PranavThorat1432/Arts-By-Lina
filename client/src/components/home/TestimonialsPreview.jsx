import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { testimonialService } from "../../services/testimonialService";
import { formatDate } from "../../utils/helpers";
import StarRating from "../common/StarRating";
import Loader from "../common/Loader";

const TestimonialsPreview = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialService.getApproved().then((data) => {
      setItems(data.slice(0, 3));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-[#1F110B]">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="font-accent text-[#C2A26F] text-xl mb-3">Kind Words</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 font-semibold">
            Customer Reviews
          </h2>
          <div className="w-16 h-0.5 bg-[#C2A26F] mx-auto mt-5" />
        </div>

        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((t) => (
              <div key={t._id} className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-[#C2A26F]/20 flex flex-col justify-between">
                <div>
                  <StarRating rating={t.rating} size={15} className="mb-4" inactiveColor="rgba(255,255,255,0.15)" />
                  <p className="font-body text-cream-200 text-sm leading-relaxed mb-5 italic">
                    "{t.reviewText}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <p className="font-display text-cream-100 font-semibold">{t.customerName}</p>
                  <p className="font-body text-cream-400 text-xs">{formatDate(t.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/testimonials" className="btn-gold">View All Reviews</Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;

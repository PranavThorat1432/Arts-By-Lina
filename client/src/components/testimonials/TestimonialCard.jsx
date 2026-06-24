import { formatDate } from "../../utils/helpers";
import StarRating from "../common/StarRating";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-2xl shadow-sm hover:shadow-md p-6 border border-earth-150 h-full flex flex-col transition-all duration-300 relative group">
    {/* Decorative Quote Icon on hover */}
    <div className="absolute right-6 top-6 text-earth-100 group-hover:text-brand-gold/10 transition-colors duration-300 pointer-events-none">
      <FaQuoteLeft size={36} />
    </div>

    <div className="flex items-center justify-between mb-5 relative z-10">
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm"
        style={{ background: "linear-gradient(135deg, #C2A26F 0%, #9E8256 100%)" }}
      >
        <span className="font-display text-white text-base font-bold">
          {testimonial.customerName.charAt(0).toUpperCase()}
        </span>
      </div>
      <StarRating rating={testimonial.rating} size={15} />
    </div>

    <p className="font-body text-earth-700 text-sm leading-relaxed flex-1 italic mb-5 relative z-10">
      "{testimonial.reviewText}"
    </p>

    <div className="flex items-center justify-between pt-4 border-t border-earth-100 relative z-10">
      <p className="font-display text-[#2A160E] font-bold text-sm tracking-wide">{testimonial.customerName}</p>
      <p className="font-body text-earth-500 text-[10px] uppercase tracking-wider">{formatDate(testimonial.createdAt)}</p>
    </div>
  </div>
);

export default TestimonialCard;

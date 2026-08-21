import { FaStar } from "react-icons/fa";

const StarRating = ({ 
  rating, 
  size = 16, 
  className = "", 
  activeColor = "#FFB800", 
  inactiveColor = "#E5D5BC" 
}) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={size}
          style={{ color: star <= rating ? activeColor : inactiveColor }}
          className="transition-colors duration-200"
        />
      ))}
    </div>
  );
};

export default StarRating;

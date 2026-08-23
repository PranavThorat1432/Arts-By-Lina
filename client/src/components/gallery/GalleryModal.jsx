import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { galleryService } from "../../services/galleryService";
import toast from "react-hot-toast";
import { MdEdit as IconEdit, MdDelete as IconDelete } from "react-icons/md";

const GalleryModal = ({ item, onClose, onDelete }) => {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!item) return null;

  const images = item.images || [item.coverImage];
  const total = images.length;

  const prev = () => setCurrentIndex((i) => (i - 1 + total) % total);
  const next = () => setCurrentIndex((i) => (i + 1) % total);

  return (
    <div
      className="fixed inset-0 z-50 bg-earth-950/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-earth-200">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-xl text-earth-900 font-semibold">{item.title}</h3>
              {admin && (
                <div className="flex items-center gap-1.5 ml-3">
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/admin/gallery", { state: { editItem: item } });
                    }}
                    className="flex items-center gap-0.5 bg-gold-600 hover:bg-gold-500 text-white text-xs px-2.5 py-1 rounded-md font-body font-semibold transition-colors"
                  >
                    <IconEdit size={12} /> Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (!window.confirm("Are you sure you want to delete this design?")) return;
                      try {
                        await galleryService.delete(item._id);
                        toast.success("Design deleted successfully");
                        if (onDelete) onDelete(item._id);
                        onClose();
                      } catch {
                        toast.error("Failed to delete design");
                      }
                    }}
                    className="flex items-center gap-0.5 bg-red-700 hover:bg-red-600 text-white text-xs px-2.5 py-1 rounded-md font-body font-semibold transition-colors"
                  >
                    <IconDelete size={12} /> Delete
                  </button>
                </div>
              )}
            </div>
            <span className="font-body text-xs text-brand-gold bg-brand-cream border border-brand-gold/10 px-2 py-0.5 rounded-full">
              {item.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-earth-100 text-earth-600 transition-colors"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Image viewer */}
        <div className="relative flex-1 min-h-0 bg-earth-950 flex items-center justify-center" style={{ minHeight: "400px" }}>
          <img
            key={currentIndex}
            src={images[currentIndex]?.url}
            alt={`${item.title} - ${currentIndex + 1}`}
            className="max-h-[55vh] max-w-full object-contain"
          />

          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40
                           rounded-full flex items-center justify-center text-white transition-all"
              >
                <FiChevronLeft size={22} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40
                           rounded-full flex items-center justify-center text-white transition-all"
              >
                <FiChevronRight size={22} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-body text-xs text-white/70 bg-earth-950/50 px-3 py-1 rounded-full">
                {currentIndex + 1} / {total}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {total > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto bg-earth-50">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all
                  ${i === currentIndex ? "border-brand-gold" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-earth-200">
          {item.description && (
            <p className="font-body text-earth-600 text-sm flex-1 mr-4 line-clamp-2">
              {item.description}
            </p>
          )}
          <Link
            to="/booking"
            state={{ serviceName: item.title, eventType: item.category }}
            onClick={onClose}
            className="btn-primary shrink-0 text-sm px-5 py-2"
          >
            Book Similar Design
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;

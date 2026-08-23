import { GALLERY_CATEGORIES } from "../../utils/constants";

const GalleryFilter = ({ active, onChange }) => (
  <div className="flex flex-wrap justify-center gap-2 mb-10">
    {GALLERY_CATEGORIES.map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={`px-5 py-2 rounded-full font-body text-sm font-semibold transition-all duration-200
          ${active === cat
            ? "bg-brand-brown text-white shadow-md"
            : "bg-white text-earth-600 border border-earth-300 hover:border-brand-gold hover:text-brand-gold"
          }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default GalleryFilter;

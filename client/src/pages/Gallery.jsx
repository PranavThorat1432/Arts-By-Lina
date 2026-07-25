import { useState, useEffect } from "react";
import { galleryService } from "../services/galleryService";
import GalleryFilter from "../components/gallery/GalleryFilter";
import GalleryCard from "../components/gallery/GalleryCard";
import GalleryModal from "../components/gallery/GalleryModal";
import Loader from "../components/common/Loader";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    galleryService.getAll().then((data) => {
      setItems(data);
      setFiltered(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleFilter = (cat) => {
    setActiveCategory(cat);
    setFiltered(cat === "All" ? items : items.filter((i) => i.category === cat));
  };

  return (
    <div className="pt-20">
      {/* Banner */}
      <section className="bg-earth-950 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/20 to-transparent" />
        <div className="relative z-10 page-container">
          <p className="section-subtitle text-brand-gold mb-3">Our Portfolio</p>
          <h1 className="font-display text-5xl md:text-7xl text-cream-50 font-semibold">Gallery</h1>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-5" />
        </div>
      </section>

      {/* Gallery Content */}
      <section className="section-padding bg-cream-50">
        <div className="page-container">
          <GalleryFilter active={activeCategory} onChange={handleFilter} />

          {loading ? <Loader /> : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-3xl text-earth-400">No designs found</p>
              <p className="font-body text-earth-400 mt-2">Try a different category</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {filtered.map((item) => (
                <GalleryCard key={item._id} item={item} onClick={setSelected} />
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <GalleryModal
          item={selected}
          onClose={() => setSelected(null)}
          onDelete={(deletedId) => {
            setItems((prev) => prev.filter((i) => i._id !== deletedId));
            setFiltered((prev) => prev.filter((i) => i._id !== deletedId));
          }}
        />
      )}
    </div>
  );
};

export default Gallery;

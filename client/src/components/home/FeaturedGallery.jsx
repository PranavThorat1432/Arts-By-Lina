import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { galleryService } from "../../services/galleryService";
import Loader from "../common/Loader";

const FeaturedGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    galleryService.getFeatured().then((data) => {
      setItems(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-cream-50">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="section-subtitle mb-3 text-brand-gold font-bold tracking-[0.2em] uppercase text-xs">Our Work</p>
          <h2 className="section-title">Featured Gallery</h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {loading ? <Loader /> : items.length === 0 ? (
          <p className="text-center text-earth-500 font-body">No designs found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Left Large Card */}
            <div className="lg:col-span-6">
              <Link
                to={`/gallery`}
                className="group relative block w-full h-full min-h-[350px] lg:min-h-[480px] rounded-2xl overflow-hidden shadow-md"
              >
                <img
                  src={items[0]?.coverImage?.url || "/placeholder-gallery.jpg"}
                  alt={items[0]?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div>
                    <span className="font-body text-brand-gold text-xs font-bold uppercase tracking-wider bg-brand-brown/80 px-2.5 py-1 rounded-full">
                      {items[0]?.category}
                    </span>
                    <p className="font-display text-white text-2xl font-bold mt-2">{items[0]?.title}</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right 2x2 Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {items.slice(1, 5).map((item) => (
                <Link
                  key={item._id}
                  to={`/gallery`}
                  className="group relative block aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={item.coverImage?.url || "/placeholder-gallery.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent flex items-end p-4">
                    <div>
                      <span className="font-body text-brand-gold text-[10px] font-bold uppercase tracking-wider bg-brand-brown/80 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <p className="font-display text-white text-base font-bold mt-1.5 leading-snug">{item.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/gallery" className="btn-primary inline-flex items-center gap-2 hover:bg-brand-brown/95 transition-colors">
            View Full Gallery
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGallery;

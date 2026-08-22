const GalleryCard = ({ item, onClick }) => (
  <div
    className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer break-inside-avoid mb-4 bg-earth-50"
    onClick={() => onClick(item)}
  >
    <img
      src={item.coverImage?.url || "/placeholder-gallery.jpg"}
      alt={item.title}
      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-earth-950/80 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0
                    opacity-0 group-hover:opacity-100 transition-all duration-300">
      <p className="font-display text-white font-semibold text-lg leading-tight">{item.title}</p>
      <span className="inline-block font-body text-gold-300 text-xs mt-1 bg-brand-brown/80 px-2 py-0.5 rounded-full">
        {item.category}
      </span>
    </div>
    {/* Image count badge */}
    {item.images?.length > 1 && (
      <div className="absolute top-2 right-2 bg-earth-950/70 text-white text-xs font-body
                      px-2 py-1 rounded-full flex items-center gap-1">
        <span>📷</span>
        <span>{item.images.length}</span>
      </div>
    )}
  </div>
);

export default GalleryCard;

import { Link } from "react-router-dom";
import { useSettings } from "../../hooks/useSettings";
import about from "../../assets/about.png";


export const AboutPreview = () => {
  const { settings } = useSettings();

  return (
    <section className="section-padding bg-cream-50">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-subtitle mb-3">About the Artist</p>
            <h2 className="section-title mb-6">Where Art Meets Tradition</h2>
            <div className="w-16 h-0.5 bg-gold-500 mb-6" />
            <p className="font-body text-earth-600 leading-relaxed mb-4">
              {settings?.aboutContent
                ? settings.aboutContent.slice(0, 300) + (settings.aboutContent.length > 300 ? "..." : "")
                : "With years of experience in the art of Mehndi, Lina brings creativity, precision, and passion to every design. Specializing in bridal, Arabic, and festival Mehndi, each design is crafted with love."}
            </p>
            <Link to="/about" className="btn-primary mt-4">
              Read More
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
              <img
                src={about}
                alt="Mehndi Artist"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-gold-500 rounded-lg hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

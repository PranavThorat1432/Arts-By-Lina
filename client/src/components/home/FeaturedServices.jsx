import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { serviceService } from "../../services/serviceService";
import { formatPrice } from "../../utils/helpers";
import Loader from "../common/Loader";

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serviceService.getAll().then((data) => {
      setServices(data.slice(0, 4));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-earth-950">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="section-subtitle text-gold-400 mb-3">What We Offer</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 font-semibold">
            Our Services
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-5" />
        </div>

        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="group bg-earth-900 rounded-xl overflow-hidden hover:bg-earth-800 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image?.url || "/placeholder-service.jpg"}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-cream-100 mb-2">{service.name}</h3>
                  <p className="font-body text-earth-400 text-sm leading-relaxed mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  <p className="font-body text-gold-400 font-semibold text-sm">
                    Starting from {formatPrice(service.startingPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/services" className="btn-gold">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;

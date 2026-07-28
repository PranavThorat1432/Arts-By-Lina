import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serviceService } from "../services/serviceService";
import { formatPrice } from "../utils/helpers";
import Loader from "../components/common/Loader";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    serviceService.getAll().then((data) => {
      setServices(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20">
      {/* Banner */}
      <section className="bg-earth-950 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/20 to-transparent" />
        <div className="relative z-10 page-container">
          <p className="section-subtitle text-brand-gold mb-3">What We Offer</p>
          <h1 className="font-display text-5xl md:text-7xl text-cream-50 font-semibold">Our Services</h1>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-5" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-cream-50">
        <div className="page-container">
          {loading ? <Loader /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service._id}
                  onClick={() => navigate(`/services/${service._id}`)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-earth-100 cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image?.url || "/placeholder-service.jpg"}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display text-2xl text-earth-900 font-semibold">{service.name}</h3>
                      <span className="font-body text-brand-gold font-bold text-sm bg-brand-cream border border-earth-150 px-3 py-1 rounded-full shrink-0 ml-2">
                        {formatPrice(service.startingPrice)}+
                      </span>
                    </div>
                    <p className="font-body text-earth-500 text-sm leading-relaxed mb-5 line-clamp-3">
                      {service.description}
                    </p>
                    <Link
                      to="/booking"
                      state={{ serviceName: service.name, eventType: service.name }}
                      onClick={(e) => e.stopPropagation()}
                      className="btn-primary w-full text-center text-sm py-3 block font-semibold hover:bg-brand-brown hover:text-white transition-all duration-300"
                    >
                      Book This Service
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-brown text-center">
        <div className="page-container">
          <h2 className="font-display text-4xl text-cream-50 font-semibold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="font-body text-earth-200 mb-8 max-w-lg mx-auto">
            We also offer fully customized Mehndi designs tailored to your preferences.
          </p>
          <Link to="/contact" className="btn-gold hover:bg-brand-cream hover:text-brand-gold transition-colors duration-300">Contact Us for Custom Design</Link>
        </div>
      </section>
    </div>
  );
};

export default Services;

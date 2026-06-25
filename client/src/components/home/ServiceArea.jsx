import { FaMapMarkerAlt, FaHome, FaBuilding, FaRing } from "react-icons/fa";
import { useSettings } from "../../hooks/useSettings";

export const ServiceArea = () => {
  const { settings } = useSettings();

  const areas = [
    { icon: FaMapMarkerAlt, label: "Based in Jalgaon", desc: "Serving Jalgaon city" },
    { icon: FaHome,         label: "Home Visits",      desc: "We come to you" },
    { icon: FaBuilding,     label: "Venue Visits",     desc: "At your event venue" },
    { icon: FaRing,         label: "Bridal Bookings",  desc: "Special bridal packages" },
  ];

  return (
    <section className="section-padding bg-cream-100">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="section-subtitle mb-3">Where We Serve</p>
          <h2 className="section-title">Service Area</h2>
          <p className="font-body text-earth-600 mt-4">
            {settings?.serviceAreaText || "Jalgaon City and Nearby Areas"}
          </p>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {areas.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="text-center group">
              <div className="w-16 h-16 bg-maroon-700 rounded-full flex items-center justify-center mx-auto mb-4
                              group-hover:bg-gold-500 transition-colors duration-300">
                <Icon className="text-white" size={28} />
              </div>
              <h3 className="font-display text-lg text-earth-800 font-semibold mb-1">{label}</h3>
              <p className="font-body text-earth-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

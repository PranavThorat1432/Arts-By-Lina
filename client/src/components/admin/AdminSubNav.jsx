import { NavLink } from "react-router-dom";

export const AdminSubNav = () => {
  const tabs = [
    { name: "Home", path: "/admin/dashboard" },
    { name: "Bookings", path: "/admin/bookings" },
    { name: "Services", path: "/admin/services" },
    { name: "Gallery", path: "/admin/gallery" },
    { name: "Testimonials", path: "/admin/testimonials" },
    { name: "Contact", path: "/admin/contacts" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex border-b border-earth-150 mb-6 overflow-x-auto scrollbar-none bg-white p-1 rounded-xl shadow-sm">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `px-4 py-2 text-xs font-bold font-body rounded-lg transition-all duration-250 whitespace-nowrap
               ${isActive 
                 ? "bg-brand-cream text-brand-gold border border-brand-gold/20" 
                 : "text-earth-500 hover:text-brand-brown hover:bg-brand-cream/30"}`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSubNav;

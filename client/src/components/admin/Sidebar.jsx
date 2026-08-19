import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard, MdPhotoLibrary, MdMiscellaneousServices,
  MdEventNote, MdMessage, MdStar, MdSettings, MdLock, MdLogout
} from "react-icons/md";
import { FiX } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

const NAV_ITEMS = [
  { to: "/admin/dashboard",     icon: MdDashboard,              label: "Dashboard" },
  { to: "/admin/gallery",       icon: MdPhotoLibrary,           label: "Gallery" },
  { to: "/admin/services",      icon: MdMiscellaneousServices,  label: "Services" },
  { to: "/admin/bookings",      icon: MdEventNote,              label: "Bookings" },
  { to: "/admin/contacts",      icon: MdMessage,                label: "Contacts" },
  { to: "/admin/testimonials",  icon: MdStar,                   label: "Testimonials" },
  { to: "/admin/settings",      icon: MdSettings,               label: "Settings" },
  { to: "/admin/change-password", icon: MdLock,                 label: "Change Password" },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-[#1F110B] text-white
                  flex flex-col transition-transform duration-300 border-r border-[#C2A26F]/10
                  ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-[#C2A26F]/10">
        <div>
          <p className="font-display text-2xl text-[#C2A26F] font-bold tracking-wide">Arts by Lina</p>
          <p className="font-body text-[9px] tracking-[0.25em] text-[#C2A26F]/60 uppercase font-semibold mt-1">Henna Studio</p>
        </div>
        <button onClick={onClose} className="md:hidden text-[#C2A26F] hover:text-white">
          <FiX size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-5 px-4">
        <ul className="space-y-1.5">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-semibold
                   transition-all duration-200 ${
                    isActive
                      ? "bg-[#C2A26F] text-[#1F110B] shadow-md"
                      : "text-[#FEFAF0]/80 hover:bg-white/5 hover:text-white"
                  }`
                }
                onClick={onClose}
              >
                <Icon size={20} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#C2A26F]/10">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-[#C2A26F]/25
                     font-body text-sm font-semibold text-[#C2A26F] hover:bg-[#C2A26F] hover:text-[#1F110B] transition-all duration-200"
        >
          <MdLogout size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

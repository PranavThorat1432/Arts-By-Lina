import { FiMenu } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";

const AdminNavbar = ({ onMenuClick }) => {
  const { admin } = useAuth();

  return (
    <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      <button
        className="md:hidden text-earth-600 hover:text-brand-gold transition-colors"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <FiMenu size={24} />
      </button>

      <div className="hidden md:block">
        <h1 className="font-display text-xl text-earth-800 font-semibold">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <div className="text-right hidden sm:block">
          <p className="font-body text-sm font-semibold text-earth-800">
            Arts by Lina
          </p>
          <p className="font-body text-xs text-earth-500">{admin?.email}</p>
        </div>
        <div className="w-9 h-9 bg-brand-gold rounded-full flex items-center justify-center">
          <MdAdminPanelSettings className="text-white" size={20} />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;

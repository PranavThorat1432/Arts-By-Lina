import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-earth-100 py-3.5 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="page-container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity">
          <svg className="w-6 h-6 text-brand-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-1 2.2-3 3-4.5 3-1.5 0-2.5 1-2.5 2.5 0 2 2.5 3 7 6m0-11.5c1 2.2 3 3 4.5 3 1.5 0 2.5 1 2.5 2.5 0 2-2.5 3-7 6m0-11.5v9M9.5 21.75h5m-2.5-5.5v5.5m-3-13.5a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl md:text-2xl font-bold text-brand-dark tracking-wide">
              Arts by Lina
            </span>
            
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 font-body font-semibold text-sm tracking-wide transition-all duration-200 relative ${
                    isActive
                      ? "text-brand-gold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brand-gold"
                      : "text-brand-brown/85 hover:text-brand-gold"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/booking" className="btn-primary text-xs px-5 py-2.5 ml-3 font-semibold rounded-lg bg-brand-gold hover:bg-brand-gold/90 transition-colors">
              Book Now
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-brand-brown hover:text-brand-gold transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen py-4 border-t border-earth-100" : "max-h-0"
        }`}
      >
        <ul className="page-container flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `block px-4 py-3 font-body font-semibold rounded-md transition-colors ${
                    isActive
                      ? "text-brand-gold bg-brand-cream"
                      : "text-brand-brown hover:text-brand-gold hover:bg-brand-cream"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="pt-2">
            <Link to="/booking" className="btn-primary w-full text-center block bg-brand-gold py-3 text-sm">
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

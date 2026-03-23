import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.scss";
import navlinks from "../../data/navlinks.json";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  const active = navlinks.find(link => link.path === location.pathname)?.label || "Home";

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <div className="main-nav">
      <div className="container">
        <div className="navbar">

          <div className="logo">
            <p>Gulzeesh</p>
          </div>

          {/* Desktop nav links */}
          <ul className="nav-links">
            {navlinks.map((item) => (
              <li
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={active === item.label ? "active" : ""}
              >
                {item.label}
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="cart-icon-btn" onClick={handleCartClick}>
              <ShoppingCart className="cart-icon" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>

            {/* Hamburger button — visible on mobile & tablet */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile / Tablet drawer */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          {navlinks.map((item) => (
            <li
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={active === item.label ? "active" : ""}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Navbar;
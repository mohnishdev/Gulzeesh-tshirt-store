import React, { useState, useEffect } from "react";
import "./Filters.scss";
import filterOptions from "../../data/filters.json";
import { SlidersHorizontal, X } from "lucide-react";

const FilterContent = ({ onClose, filters, setFilters }) => {
  const handleCheckboxChange = (key, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [key]: checked
        ? [...(prev[key] || []), value]
        : (prev[key] || []).filter(v => v !== value)
    }));
  };

  const clearFilters = () => {
    setFilters({ gender: [], colour: [], price: [], type: [] });
    if (onClose) onClose();
  };

  return (
    <>
      <div className="filter-header">
        <h2>Filters</h2>
        {onClose && (
          <button className="filter-close-btn" onClick={onClose} aria-label="Close filters">
            <X size={20} />
          </button>
        )}
      </div>

      {filterOptions.map((section) => (
        <div className="filter-section" key={section.key}>
          <h4>{section.title}</h4>
          <div className="filter-options">
            {section.options.map((option) => (
              <label key={option.value} className="filter-item">
                <input
                  type="checkbox"
                  checked={(filters[section.key] || []).includes(option.value)}
                  onChange={(e) => handleCheckboxChange(section.key, option.value, e.target.checked)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button className="btn-clear-all" onClick={clearFilters}>
        Clear All Filters
      </button>
    </>
  );
};

const Filters = ({ filters, setFilters }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Close drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setDrawerOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ── Desktop sidebar (always visible ≥ 1024px) ── */}
      <aside className="filter-div desktop-filters">
        <FilterContent filters={filters} setFilters={setFilters} />
      </aside>

      {/* ── Mobile/Tablet FAB trigger ── */}
      <button
        className="filter-fab"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open filters"
      >
        <SlidersHorizontal size={18} />
        <span>Filters</span>
      </button>

      {/* ── Overlay ── */}
      <div
        className={`filter-overlay ${drawerOpen ? "visible" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* ── Bottom sheet drawer ── */}
      <div
        className={`filter-drawer ${drawerOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="drawer-handle" />
        <div className="drawer-body">
          <FilterContent onClose={() => setDrawerOpen(false)} filters={filters} setFilters={setFilters} />

          <div className="drawer-actions">
            <button className="btn-clear" onClick={() => setDrawerOpen(false)}>
              Clear all
            </button>
            <button className="btn-apply" onClick={() => setDrawerOpen(false)}>
              Apply filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
import React from "react";
import "./Header.scss";
import { Search } from "lucide-react";


const Header = ({ search, onSearchChange, onSearchSubmit }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearchSubmit && onSearchSubmit(search);
        }
    };

    return (
        <header className="header-main">
            <div className="container">
                <div className="header-left">
                    <h1 className="heading">
                        <span>The Editorial</span>
                        <span>Collection.</span>
                    </h1>
                    <div className="subheading">
                        <span>Curated essentials for the modern wardrobe. Asymmetric cuts, premium cotton, and an uncompromising attention to detail.</span>
                    </div>
                </div>

                <div className="header-right">
                    <div className="search">
                        <div className="search-input">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search for t-shirts (e.g., green polo)"
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>

                        <button className="search-button-container" onClick={() => onSearchSubmit && onSearchSubmit(search)}>
                            Search
                        </button>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;
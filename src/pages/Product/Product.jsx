import React, { useState } from "react";
import productsData from "../../data/products.json"
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar"
import Filters from "../../components/Filters/Filters"
import ProductListing from "../../components/ProductListing/ProductListing"
import "./product.scss"

const Product = () => {

  const [filters, setFilters] = useState({ gender: [], colour: [], price: [], type: [] })
  const [searchInput, setSearchInput] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  const handleSearchChange = (value) => {
    setSearchInput(value);
  };

  const handleSearchSubmit = (value) => {
    setAppliedSearch(value);
  };

  return (
    <div className="product-page">

      <Header 
        search={searchInput} 
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <section className="product-section">
        <div className="container">

          <div className="product-layout">
            <Filters filters={filters} setFilters={setFilters} />
            <ProductListing products={productsData} filters={filters} search={appliedSearch} />
          </div>

        </div>
      </section>

    </div>
  );
};

export default Product
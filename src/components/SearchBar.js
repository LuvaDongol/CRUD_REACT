import React, { useState } from "react";

/**
 * SearchBar - Provides search, category filter, and sort functionality
 * Includes a collapsible filter panel
 */
const SearchBar = ({
  searchTerm,
  onSearchChange,
  filterCategory,
  onFilterChange,
  sortBy,
  onSortChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="search-bar">
      <div className="search-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 Search items..."
          className="search-input"
        />
        <button
          className={`btn btn-filter ${isFilterOpen ? "active" : ""}`}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          title="Filters & Sort"
        >
          ⚙ Filters
        </button>
      </div>
      {isFilterOpen && (
        <div className="filter-row">
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => onFilterChange(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Categories</option>
              <option value="General">General</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Bakery">Bakery</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="Frozen">Frozen</option>
              <option value="Household">Household</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="category">Category</option>
              <option value="quantity">Quantity</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

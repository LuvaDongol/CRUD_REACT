import React from "react";

/**
 * Summary - Displays grocery list statistics and a progress bar
 * Shows total items, remaining, purchased, total quantity, and categories
 */
const Summary = ({ items }) => {
  const totalItems = items.length;
  const purchasedItems = items.filter((item) => item.purchased).length;
  const remainingItems = totalItems - purchasedItems;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [...new Set(items.map((item) => item.category))];
  const categoryCount = categories.length;

  const progressPercent =
    totalItems > 0 ? Math.round((purchasedItems / totalItems) * 100) : 0;

  return (
    <div className="summary">
      <div className="summary-stats">
        <div className="stat">
          <span className="stat-number">{totalItems}</span>
          <span className="stat-label">Total Items</span>
        </div>
        <div className="stat">
          <span className="stat-number">{remainingItems}</span>
          <span className="stat-label">Remaining</span>
        </div>
        <div className="stat">
          <span className="stat-number">{purchasedItems}</span>
          <span className="stat-label">Purchased</span>
        </div>
        <div className="stat">
          <span className="stat-number">{totalQuantity}</span>
          <span className="stat-label">Total Qty</span>
        </div>
        <div className="stat">
          <span className="stat-number">{categoryCount}</span>
          <span className="stat-label">Categories</span>
        </div>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
        <span className="progress-text">{progressPercent}% Complete</span>
      </div>
    </div>
  );
};

export default Summary;

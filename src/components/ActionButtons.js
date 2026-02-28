import React from "react";

/**
 * ActionButtons - Provides bulk actions for clearing items
 * Includes clear purchased and clear all with disabled states
 */
const ActionButtons = ({ items, onClearAll, onClearPurchased }) => {
  const hasPurchased = items.some((item) => item.purchased);
  const hasItems = items.length > 0;

  return (
    <div className="action-buttons">
      <button
        className="btn btn-clear-purchased"
        onClick={onClearPurchased}
        disabled={!hasPurchased}
        title="Remove all purchased items"
      >
        Clear Purchased
      </button>
      <button
        className="btn btn-clear-all"
        onClick={onClearAll}
        disabled={!hasItems}
        title="Remove all items"
      >
        Clear All
      </button>
    </div>
  );
};

export default ActionButtons;

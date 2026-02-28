import React from "react";
import GroceryItem from "./GroceryItem";

/**
 * GroceryList component - Renders the list of grocery items
 * Shows an empty state message when no items exist
 */
const GroceryList = ({ items, onDelete, onToggle, onUpdate }) => {
  if (items.length === 0) {
    return (
      <div className="empty-list">
        <p>🛒 Your grocery list is empty!</p>
        <p>Add some items to get started.</p>
      </div>
    );
  }

  return (
    <ul className="grocery-list">
      {items.map((item) => (
        <GroceryItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};

export default GroceryList;

import React, { useState } from "react";

/**
 * GroceryItem - Renders a single grocery item with edit, delete, and toggle actions
 * Supports inline editing mode with save/cancel
 */
const GroceryItem = ({ item, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [editCategory, setEditCategory] = useState(item.category);

  const handleSave = () => {
    if (editName.trim() === "") return;
    onUpdate(item.id, {
      name: editName.trim(),
      quantity: parseInt(editQuantity) || 1,
      category: editCategory,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(item.name);
    setEditQuantity(item.quantity);
    setEditCategory(item.category);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  if (isEditing) {
    return (
      <li className="grocery-item editing">
        <div className="edit-form">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="edit-input"
            autoFocus
          />
          <input
            type="number"
            value={editQuantity}
            onChange={(e) => setEditQuantity(e.target.value)}
            onKeyDown={handleKeyDown}
            className="edit-quantity"
            min="1"
          />
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="edit-category"
          >
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
          <div className="edit-actions">
            <button onClick={handleSave} className="btn btn-save" title="Save">
              ✓
            </button>
            <button
              onClick={handleCancel}
              className="btn btn-cancel"
              title="Cancel"
            >
              ✕
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={`grocery-item ${item.purchased ? "purchased" : ""}`}>
      <div className="item-content">
        <input
          type="checkbox"
          checked={item.purchased}
          onChange={() => onToggle(item.id)}
          className="item-checkbox"
        />
        <span className="item-name">{item.name}</span>
        <span className="item-quantity">×{item.quantity}</span>
        <span
          className={`item-category category-${item.category.toLowerCase()}`}
        >
          {item.category}
        </span>
      </div>
      <div className="item-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-edit"
          title="Edit"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="btn btn-delete"
          title="Delete"
        >
          🗑
        </button>
      </div>
    </li>
  );
};

export default GroceryItem;

import React, { useState } from "react";

/**
 * AddGroceryForm - Form component for creating new grocery items
 * Handles name, quantity, and category input with form validation
 */
const AddGroceryForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("General");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;

    onAdd({
      name: name.trim(),
      quantity: parseInt(quantity) || 1,
      category,
    });

    setName("");
    setQuantity(1);
    setCategory("General");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add grocery item..."
          className="form-input"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          className="form-quantity"
          title="Quantity"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-category"
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
        <button type="submit" className="btn btn-add">
          + Add
        </button>
      </div>
    </form>
  );
};

export default AddGroceryForm;

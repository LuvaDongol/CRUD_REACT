import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import AddGroceryForm from "./components/AddGroceryForm";
import GroceryList from "./components/GroceryList";

// Load items from localStorage
const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem("groceryItems");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save items to localStorage
const saveToStorage = (items) => {
  localStorage.setItem("groceryItems", JSON.stringify(items));
};

function App() {
  const [items, setItems] = useState(loadFromStorage);

  // Persist to localStorage whenever items change
  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  // CREATE - Add a new grocery item
  const addItem = useCallback((newItem) => {
    const item = {
      id: Date.now(),
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
      purchased: false,
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [item, ...prev]);
  }, []);

  // DELETE - Remove an item
  const deleteItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // UPDATE - Edit an item
  const updateItem = useCallback((id, updates) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  // Toggle purchased status
  const togglePurchased = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="container">
        <AddGroceryForm onAdd={addItem} />
        <GroceryList
          items={items}
          onDelete={deleteItem}
          onToggle={togglePurchased}
          onUpdate={updateItem}
        />
      </div>
      <footer className="app-footer">
        <p>Grocery List CRUD App &copy; 2026</p>
      </footer>
    </div>
  );
}

export default App;

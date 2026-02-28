import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import AddGroceryForm from "./components/AddGroceryForm";

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

  return (
    <div className="app">
      <Header />
      <div className="container">
        <AddGroceryForm onAdd={addItem} />
        <p style={{ color: "white", textAlign: "center", marginTop: "1rem" }}>
          Items in list: {items.length}
        </p>
      </div>
      <footer className="app-footer">
        <p>Grocery List CRUD App &copy; 2026</p>
      </footer>
    </div>
  );
}

export default App;

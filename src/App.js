import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import AddGroceryForm from "./components/AddGroceryForm";
import SearchBar from "./components/SearchBar";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

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

  // Filter and sort items
  const getFilteredItems = () => {
    let filtered = [...items];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (filterCategory !== "All") {
      filtered = filtered.filter((item) => item.category === filterCategory);
    }

    // Sort
    switch (sortBy) {
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "category":
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "quantity":
        filtered.sort((a, b) => b.quantity - a.quantity);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return filtered;
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="app">
      <Header />
      <div className="container">
        <AddGroceryForm onAdd={addItem} />
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterCategory={filterCategory}
          onFilterChange={setFilterCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <GroceryList
          items={filteredItems}
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

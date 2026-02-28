import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <p>Content will go here...</p>
      </div>
      <footer className="app-footer">
        <p>Grocery List CRUD App &copy; 2026</p>
      </footer>
    </div>
  );
}

export default App;

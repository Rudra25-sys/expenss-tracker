import { useState } from "react";
import "./App.css";
import Dashboard from "./dashboard";
import Income from "./income";
import Expenses from "./expenss"
import Categories from "./component";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>💰 Expense Tracker</h2>

        <ul>
          <li onClick={() => setPage("dashboard")}>🏠 Dashboard</li>
          <li onClick={() => setPage("expenses")}>💸 Expenses</li>
          <li onClick={() => setPage("income")}>💰 Income</li>
           <li onClick={() => setPage("categories")}>📂 Categories</li> 
          <li>📊 Reports</li>
          <li>⚙️ Settings</li>
        </ul>
      </aside>

      <main className="main">
   
        {page === "dashboard" && <Dashboard />}
        {page === "income" && <Income />}
        {page === "expenses" && <Expenses />}
        {page === "categories" && <Categories />}
      </main>
    </div>
  );
}

export default App;
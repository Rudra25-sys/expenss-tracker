import { useState } from "react";
import "./App.css";
import Dashboard from "./dashboard";
import Income from "./income";
import Expenses from "./expenss";
import Categories from "./component";
import Home from "./home";
import Login from "./login";
import Report from "./report";
import Register from "./register";
function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">

      {page !== "home" && 
 page !== "login" &&
 page !== "register" && (
        <aside className="sidebar">
          <h2>💰 Expense Tracker</h2>

          <ul>
            <li onClick={() => setPage("dashboard")}>📊 Dashboard</li>
            <li onClick={() => setPage("expenses")}>💸 Expenses</li>
            <li onClick={() => setPage("income")}>💰 Income</li>
            <li onClick={() => setPage("categories")}>📂 Categories</li>
            <li onClick={()=> setPage("report")}>📊 Reports</li>
            <li>⚙️ Settings</li>
          </ul>
        </aside>
      )}

      <main className="main">
        {page === "home" && <Home setPage={setPage} />}
        {page === "dashboard" && <Dashboard />}
        {page === "income" && <Income />}
        {page === "expenses" && <Expenses />}
        {page === "categories" && <Categories />}
        {page === "login" && <Login setPage={setPage} />}
        {page === "register" && <Register setPage={setPage} />}
        {page==="report"&& <Report setPage={setPage}/>}
      </main>

    </div>
  );
}

export default App;
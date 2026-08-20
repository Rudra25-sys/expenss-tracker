import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./dashboard";
import Income from "./income";
import Expenses from "./expenss";
import Categories from "./component";
import Home from "./home";
import Login from "./login";
import Report from "./report";
import Register from "./register";
import VerifyOtp from "./verifyOtp";
import ForgotPassword from "./forgotPassword";
function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setPage("dashboard");
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setPage("home");
  };

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
          </ul>

          {user && (
            <div className="sidebar-user">
              <hr />
              <p className="user-name">👤 {user.username || user.name}</p>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </aside>
      )}

      <main className="main">
        {page === "home" && <Home setPage={setPage} />}
        {page === "dashboard" && <Dashboard />}
        {page === "income" && <Income />}
        {page === "expenses" && <Expenses />}
        {page === "categories" && <Categories />}
        {page === "login" && <Login setPage={setPage} setUser={setUser} />}
        {page === "register" && <Register setPage={setPage} />}
        {page === "verify-otp" && <VerifyOtp setPage={setPage} />}
        {page === "forgot-password" && <ForgotPassword setPage={setPage} />}
        {page==="report"&& <Report setPage={setPage}/>}
      </main>

    </div>
  );
}

export default App;
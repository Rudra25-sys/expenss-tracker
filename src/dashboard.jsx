import { useEffect, useState } from "react";
import "./styles/Dashboard.css";

const API = "http://localhost:5000/api/dashboard";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netProfit: 0
  });

  const fetchDashboard = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      setDashboard(data);
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const formatMoney = (amount) => {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  };

  return (
    <main className="main">
      <header>
        <h1>Dashboard</h1>

      </header>

      <section className="cards">

        <div className="card green">
          <h3>Total Income</h3>
          <h1>
            {formatMoney(dashboard.totalIncome)}
          </h1>
        </div>

        <div className="card red">
          <h3>Total Expense</h3>
          <h1>
            {formatMoney(dashboard.totalExpense)}
          </h1>
        </div>

        <div className="card blue">     
          <h3>Net Profit</h3>
          <h1>
            {formatMoney(dashboard.netProfit)}
          </h1>
        </div>

      </section>

      <section className="chart">
        <h2>Expense Chart</h2>

        <div className="chart-box">
          Total Expense:{" "}
          {formatMoney(dashboard.totalExpense)}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
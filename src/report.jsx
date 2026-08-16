import React from "react";
function Reports() {
  const income = 125000;
  const expense = 72000;
  const savings = income - expense;

  const spendingRate = ((expense / income) * 100).toFixed(2);
  const savingsRate = ((savings / income) * 100).toFixed(2);

  return (
    <div className="reports">

      <div className="report-header">
        <h1>Reports</h1>

        <div>
          <select>
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>

          <button>📥 Download PDF</button>
        </div>
      </div>

      {/* Summary */}
      <div className="cards">

        <div className="card green">
          <p>Total Income</p>
          <h2>₹1,25,000</h2>
        </div>

        <div className="card red">
          <p>Total Expense</p>
          <h2>₹72,000</h2>
        </div>

        <div className="card purple">
          <p>Total Savings</p>
          <h2>₹53,000</h2>
        </div>

        <div className="card orange">
          <p>Spend Rate</p>
          <h2>{spendingRate}%</h2>
        </div>

      </div>

      {/* Analysis */}
      <div className="row">

        <div className="box">
          <h3>Where Am I Spending Most?</h3>

          <h2>🏠 Housing</h2>
          <p>₹30,000 — 41.7%</p>

          <div className="progress">
            <div className="housing"></div>
          </div>

          <p>🛍️ Shopping — ₹20,000</p>
          <div className="progress">
            <div className="shopping"></div>
          </div>

          <p>🍔 Food — ₹12,000</p>
          <div className="progress">
            <div className="food"></div>
          </div>

          <p>🚗 Travel — ₹10,000</p>
          <div className="progress">
            <div className="travel"></div>
          </div>
        </div>


        <div className="box">
          <h3>Expense By Category</h3>

          <div className="donut"></div>

          <div className="legend">
            <p>🔵 Housing — 41.7%</p>
            <p>🟠 Shopping — 27.8%</p>
            <p>🟢 Food — 16.7%</p>
            <p>🔷 Travel — 13.9%</p>
          </div>
        </div>

      </div>

      {/* Income vs Expense */}
      <div className="box">
        <h3>Income vs Expense</h3>

        <div className="chart">

          <div className="bar income">
            <span>₹1,25,000</span>
          </div>

          <div className="bar expense">
            <span>₹72,000</span>
          </div>

        </div>

        <div className="chart-label">
          <span>🟢 Income</span>
          <span>🔴 Expense</span>
        </div>
      </div>


      {/* Bottom */}
      <div className="row">

        <div className="box">
          <h3>Savings Analysis</h3>

          <h1 className="saving">
            ₹{savings.toLocaleString("en-IN")}
          </h1>

          <p>You saved this month</p>

          <div className="progress">
            <div
              className="saving-progress"
              style={{ width: `${savingsRate}%` }}
            ></div>
          </div>

          <p>Savings Rate: {savingsRate}%</p>
        </div>


        <div className="box">
          <h3>Spending Trend</h3>

          <div className="trend">
            ↗
          </div>

          <h3 className="blue">
            Spending is increasing
          </h3>
        </div>

      </div>

    </div>
  );
}

export default Reports;
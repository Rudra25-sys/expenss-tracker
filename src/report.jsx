import { useEffect, useMemo, useState } from "react";
import "./styles/Reports.css";

const INCOME_API =
  "http://localhost:5000/api/income";

const EXPENSE_API =
  "http://localhost:5000/api/expenses";

function Reports() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const fetchData = async () => {
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        fetch(INCOME_API),
        fetch(EXPENSE_API)
      ]);

      if (!incomeRes.ok) {
        throw new Error("Failed to fetch income");
      }

      if (!expenseRes.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const incomeData = await incomeRes.json();
      const expenseData = await expenseRes.json();

      setIncome(Array.isArray(incomeData) ? incomeData : []);
      setExpenses(Array.isArray(expenseData) ? expenseData : []);
    } catch (error) {
      console.error("Reports error:", error);
      setIncome([]);
      setExpenses([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalIncome = useMemo(() => {
    return income.reduce(
      (total, item) =>
        total + Number(item.amount),
      0
    );
  }, [income]);

  const totalExpense = useMemo(() => {
    return expenses.reduce(
      (total, item) =>
        total + Number(item.amount),
      0
    );
  }, [expenses]);

  const savings = totalIncome - totalExpense;

  const spendingRate =
    totalIncome > 0
      ? ((totalExpense / totalIncome) * 100).toFixed(2)
      : "0.00";

  const savingsRate =
    totalIncome > 0
      ? ((savings / totalIncome) * 100).toFixed(2)
      : "0.00";

  const categoryTotals = useMemo(() => {
    const result = {};

    expenses.forEach((item) => {
      const category = item.category || "Other";

      result[category] =
        (result[category] || 0) +
        Number(item.amount || 0);
    });

    return Object.entries(result)
      .sort((a, b) => b[1] - a[1]);
  }, [expenses]);

  const incomeCategoryTotals = useMemo(() => {
    const result = {};

    income.forEach((item) => {
      const category = item.category || "Other";

      result[category] =
        (result[category] || 0) +
        Number(item.amount || 0);
    });

    return Object.entries(result)
      .sort((a, b) => b[1] - a[1]);
  }, [income]);

  const formatMoney = (amount) => {
    return `₹${Number(amount).toLocaleString(
      "en-IN"
    )}`;
  };

  return (
    <div className="reports">

      <div className="report-header">
        <h1>Reports</h1>

        <div>
          <select defaultValue="This Month">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>

          <button>
            📥 Download PDF
          </button>
        </div>
      </div>

      <div className="cards">

        <div className="card green">
          <p>Total Income</p>

          <h2>
            {formatMoney(totalIncome)}
          </h2>
        </div>

        <div className="card red">
          <p>Total Expense</p>

          <h2>
            {formatMoney(totalExpense)}
          </h2>
        </div>

        <div className="card purple">
          <p>Total Savings</p>

          <h2>
            {formatMoney(savings)}
          </h2>
        </div>

        <div className="card orange">
          <p>Spend Rate</p>

          <h2>
            {spendingRate}%
          </h2>
        </div>

      </div>

      <div className="row">

        <div className="box">
          <h3>
            Where Am I Spending Most?
          </h3>

          {categoryTotals.length === 0 ? (
            <p>No expenses found.</p>
          ) : (
            categoryTotals.map(
              ([category, amount]) => {
                const percentage =
                  totalExpense > 0
                    ? (
                        (amount /
                          totalExpense) *
                        100
                      ).toFixed(1)
                    : 0;

                return (
                  <div key={category}>
                    <p>
                      {category} —{" "}
                      {formatMoney(amount)}{" "}
                      ({percentage}%)
                    </p>

                    <div className="progress">
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: "10px",
                          backgroundColor:
                            "#0d6efd",
                          borderRadius: "5px"
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )
          )}
        </div>

        <div className="box">
          <h3>
            Income by Category
          </h3>

          {incomeCategoryTotals.length === 0 ? (
            <p>No income data found.</p>
          ) : (
            incomeCategoryTotals.map(([category, amount]) => {
              const percentage =
                totalIncome > 0
                  ? ((amount / totalIncome) * 100).toFixed(1)
                  : 0;

              return (
                <p key={category}>
                  🟢 {category} — {formatMoney(amount)} ({percentage}%)
                </p>
              );
            })
          )}
        </div>

      </div>

      <div className="box">
        <h3>
          Expense By Category
        </h3>

        {categoryTotals.length === 0 ? (
          <p>No expense category data found.</p>
        ) : (
          categoryTotals.map(([category, amount]) => {
            const percentage =
              totalExpense > 0
                ? ((amount / totalExpense) * 100).toFixed(1)
                : 0;

            return (
              <p key={category}>
                🔵 {category} — {formatMoney(amount)} ({percentage}%)
              </p>
            );
          })
        )}
      </div>

      <div className="box">
        <h3>
          Income vs Expense
        </h3>

        <div className="chart">

          <div
            className="bar income"
            style={{
              width: `${
                totalIncome > 0
                  ? 100
                  : 0
              }%`
            }}
          >
            <span>
              {formatMoney(totalIncome)}
            </span>
          </div>

          <div
            className="bar expense"
            style={{
              width: `${
                totalIncome > 0
                  ? Math.min(
                      (totalExpense /
                        totalIncome) *
                        100,
                      100
                    )
                  : 0
              }%`
            }}
          >
            <span>
              {formatMoney(totalExpense)}
            </span>
          </div>

        </div>

        <div className="chart-label">
          <span>🟢 Income</span>
          <span>🔴 Expense</span>
        </div>
      </div>

      <div className="row">

        <div className="box">
          <h3>
            Savings Analysis
          </h3>

          <h1 className="saving">
            {formatMoney(savings)}
          </h1>

          <p>
            You saved this month
          </p>

          <div className="progress">
            <div
              className="saving-progress"
              style={{
                width: `${Math.max(
                  0,
                  Math.min(
                    Number(savingsRate),
                    100
                  )
                )}%`
              }}
            />
          </div>

          <p>
            Savings Rate:{" "}
            {savingsRate}%
          </p>
        </div>

        <div className="box">
          <h3>
            Spending Trend
          </h3>

          <div className="trend">
            ↗
          </div>

          <h3 className="blue">
            {totalExpense > 0
              ? "Spending data available"
              : "No spending yet"}
          </h3>
        </div>

      </div>

    </div>
  );
}

export default Reports;
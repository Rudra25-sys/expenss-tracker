import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import "./styles/Reports.css";

const INCOME_API =
  "http://localhost:5000/api/income";

const EXPENSE_API =
  "http://localhost:5000/api/expenses";

const CATEGORY_API =
  "http://localhost:5000/api/categories";

function Reports() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        fetch(INCOME_API),
        fetch(EXPENSE_API)
      ]);
      const categoryRes = await fetch(CATEGORY_API);

      if (!incomeRes.ok) {
        throw new Error("Failed to fetch income");
      }

      if (!expenseRes.ok) {
        throw new Error("Failed to fetch expenses");
      }

      if (!categoryRes.ok) {
        throw new Error("Failed to fetch categories");
      }

      const incomeData = await incomeRes.json();
      const expenseData = await expenseRes.json();
      const categoryData = await categoryRes.json();

      setIncome(Array.isArray(incomeData) ? incomeData : []);
      setExpenses(Array.isArray(expenseData) ? expenseData : []);
      setCategories(Array.isArray(categoryData) ? categoryData : []);
    } catch (error) {
      console.error("Reports error:", error);
      setIncome([]);
      setExpenses([]);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalIncome = useMemo(() => {
    const transactionIncome = income.reduce(
      (total, item) =>
        total + Number(item.amount),
      0
    );

    const categoryIncome = categories.reduce(
      (total, item) =>
        item.type === "Income" ? total + Number(item.amount || 0) : total,
      0
    );

    return transactionIncome + categoryIncome;
  }, [income, categories]);

  const totalExpense = useMemo(() => {
    const transactionExpense = expenses.reduce(
      (total, item) =>
        total + Number(item.amount),
      0
    );

    const categoryExpense = categories.reduce(
      (total, item) =>
        item.type === "Expense" ? total + Number(item.amount || 0) : total,
      0
    );

    return transactionExpense + categoryExpense;
  }, [expenses, categories]);

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

    categories.forEach((item) => {
      if (item.type === "Expense") {
        result[item.name] =
          (result[item.name] || 0) + Number(item.amount || 0);
      }
    });

    return Object.entries(result)
      .sort((a, b) => b[1] - a[1]);
  }, [expenses, categories]);

  const incomeCategoryTotals = useMemo(() => {
    const result = {};

    income.forEach((item) => {
      const category = item.category || "Other";

      result[category] =
        (result[category] || 0) +
        Number(item.amount || 0);
    });

    categories.forEach((item) => {
      if (item.type === "Income") {
        result[item.name] =
          (result[item.name] || 0) + Number(item.amount || 0);
      }
    });

    return Object.entries(result)
      .sort((a, b) => b[1] - a[1]);
  }, [income, categories]);

  const formatMoney = (amount) => {
    return `₹${Number(amount).toLocaleString(
      "en-IN"
    )}`;
  };

  const downloadReport = () => {
    try {
      const pdf = new jsPDF();
      const generatedAt = new Date().toLocaleDateString("en-IN");
      let y = 20;

      pdf.setFontSize(22);
      pdf.text("Expense Tracker Report", 20, y);
      y += 10;

      pdf.setFontSize(11);
      pdf.setTextColor(100);
      pdf.text(`Generated: ${generatedAt}`, 20, y);
      y += 14;

      pdf.setTextColor(0);
      pdf.setFontSize(13);
      pdf.text(`Total Income: ${formatMoney(totalIncome)}`, 20, y);
      pdf.text(`Total Expense: ${formatMoney(totalExpense)}`, 110, y);
      y += 8;
      pdf.text(`Total Savings: ${formatMoney(savings)}`, 20, y);
      pdf.text(`Spend Rate: ${spendingRate}%`, 110, y);
      y += 16;

      const addCategorySection = (title, entries) => {
        if (y > 260) {
          pdf.addPage();
          y = 20;
        }

        pdf.setFontSize(15);
        pdf.text(title, 20, y);
        y += 9;
        pdf.setFontSize(11);

        if (entries.length === 0) {
          pdf.text("No data found.", 20, y);
          y += 10;
          return;
        }

        entries.forEach(([category, amount]) => {
          if (y > 280) {
            pdf.addPage();
            y = 20;
          }

          pdf.text(category, 20, y);
          pdf.text(formatMoney(amount), 150, y);
          y += 7;
        });

        y += 8;
      };

      addCategorySection("Income by Category", incomeCategoryTotals);
      addCategorySection("Expenses by Category", categoryTotals);

      pdf.save("expense-tracker-report.pdf");
    } catch (error) {
      console.error("Report download error:", error);
      alert("Unable to download the report. Please try again.");
    }
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

          <button type="button" onClick={downloadReport}>
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
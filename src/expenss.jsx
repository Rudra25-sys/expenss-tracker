import { useEffect, useState } from "react";
import "./styles/Expense.css";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses")
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });

    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.filter((item) => item.type === "Expense"));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Calculate total dynamically
  const totalExpense = categories.reduce(
    (total, category) => total + Number(category.amount || 0),
    0
  );
  

  return (
    <div className="expense-container">
      <h2>Expenses</h2>

      {/* Total Expense */}
      <div className="total-expense-card">
        <h3>Total Expense</h3>
        <h1>₹{totalExpense.toLocaleString("en-IN")}</h1>
      </div>

      <div className="category-list">
        {categories.length === 0 ? (
          <p>No expense categories yet.</p>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="expense-category-tag">
              <span>{category.name}</span>
              <strong>₹{Number(category.amount || 0).toLocaleString("en-IN")}</strong>
            </div>
          ))
        )}
      </div>

      {/* Add Expense Button */}
      <button className="add-expense-btn">Add Expense</button>

      {/* Expense List */}
      <div className="expense-list">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div className="expense-details">
              <h3>{expense.title}</h3>

              <span className="expense-category">
                {expense.category}
              </span>

              <span className="expense-date">
                {expense.date}
              </span>
            </div>

            <div className="expense-amount">
              ₹{Number(expense.amount).toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Expenses;
import { useEffect, useState } from "react";

function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses")
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  return (
    <div className="expense-container">
      <h2>Expenses</h2>

      <div className="expense-card">
        <h3>Total Expense</h3>
        <h1>₹72,000</h1>
      </div>

      <button>Add Expense</button>

      {expenses.map((expense) => (
        <div key={expense.id} className="expense-card">
          <p>{expense.title}</p>
          <p>₹{expense.amount}</p>
          <p>{expense.category}</p>
          <p>{expense.date}</p>
        </div>
      ))}
    </div>
  );
}

export default Expenses;
import { useEffect, useState } from "react";
import "./styles/Income.css";

function Income() {
  const [income, setIncome] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/income")
      .then((res) => res.json())
      .then((data) => {
        setIncome(data);
      })
      .catch((error) => {
        console.error("Error fetching income:", error);
      });

    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.filter((item) => item.type === "Income"));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Calculate total income
  const totalIncome = categories.reduce(
    (total, category) => total + Number(category.amount || 0),
    0
  );

  return (
    <div className="income-container">
      <h2>Income</h2>

      {/* Total Income */}
      <div className="income-total-card">
        <h3>Total Income</h3>
        <h1>₹{totalIncome.toLocaleString("en-IN")}</h1>
      </div>

      <div className="category-list">
        {categories.length === 0 ? (
          <p>No income categories yet.</p>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="income-category-tag">
              <span>{category.name}</span>
              <strong>₹{Number(category.amount || 0).toLocaleString("en-IN")}</strong>
            </div>
          ))
        )}
      </div>


      {/* Income List */}
      <div className="income-list">
        {income.map((item) => (
          <div key={item.id} className="income-item">
            <div className="income-details">
              <h4>{item.title}</h4>

              {item.category && (
                <span className="income-category">
                  {item.category}
                </span>
              )}

              {item.date && (
                <span className="income-date">
                  {item.date}
                </span>
              )}
            </div>

            <div className="income-amount">
              ₹{Number(item.amount || 0).toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Income;
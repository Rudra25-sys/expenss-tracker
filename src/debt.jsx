import { useEffect, useState } from "react";
import "./styles/debt.css";

const API = "http://localhost:5000/api/debt";

function AddDebt({ onAdded }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !title || !amount || !date) {
      alert("Please fill in name, title, amount, and date.");
      return;
    }

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          title,
          amount,
          date
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add debt");
      }

      setName("");
      setTitle("");
      setAmount("");
      setDate("");
      onAdded?.();
    } catch (error) {
      console.error("Add debt failed:", error);
      alert(error.message || "Add debt failed");
    }
  };

  return (
    <form className="debt-form" onSubmit={handleSubmit}>
      <div className="debt-field">
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="debt-field">
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="debt-field">
        <label>Amount</label>
        <input type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>

      <div className="debt-field">
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <button type="submit" className="debt-submit-btn">Add Debt</button>
    </form>
  );
}

function Debt() {
  const [debts, setDebts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchDebts = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load debts");
      }

      setDebts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Load debts failed:", error);
      setDebts([]);
    }
  };

  useEffect(() => {
    fetchDebts();
  }, []);

  const totalDebt = debts.reduce((sum, debt) => sum + Number(debt.amount || 0), 0);

  return (
    <div className="debt-page">
      <h2>Debt</h2>

      <div className="debt-toolbar">
        <button className="debt-toggle-btn" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Close form" : "Add Debt"}
        </button>
      </div>

      {showForm && <AddDebt onAdded={fetchDebts} />}

      <div className="debt-container">
        <h3>Total Debt</h3>
        <h1>₹{Number(totalDebt).toFixed(2)}</h1>
      </div>

      <div className="debt-list">
        <h3>Debt Entries</h3>

        {debts.length === 0 ? (
          <p>No debt entries yet.</p>
        ) : (
          <ul>
            {debts.map((debt) => (
              <li key={debt.id} className="debt-item">
                <div>
                  <strong>{debt.name}</strong>
                  <span>{debt.title}</span>
                </div>
                <div>
                  <span>₹{Number(debt.amount).toFixed(2)}</span>
                  <small>{debt.date}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Debt;

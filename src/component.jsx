import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/categories";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");

  // GET categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      setCategories(data);
    } catch (error) {
      console.error("Categories error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ADD category
  const addCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    if (amount === "" || Number(amount) < 0) {
      alert("Valid amount is required");
      return;
    }

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
          amount: Number(amount),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setCategories((prev) => [...prev, data]);

      setName("");
      setType("Expense");
      setAmount("");
    } catch (error) {
      console.error("Add category error:", error);
    }
  };

  // DELETE category
  const deleteCategory = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setCategories((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Delete category error:", error);
    }
  };

  const incomeCount = categories.filter(
    (item) => item.type === "Income"
  ).length;

  const expenseCount = categories.filter(
    (item) => item.type === "Expense"
  ).length;

  return (
    <div>
      <h2>Categories</h2>

      <div>
        <h4>Total Categories: {categories.length}</h4>
        <h4>Income: {incomeCount}</h4>
        <h4>Expense: {expenseCount}</h4>
      </div>

      <hr />

      <form onSubmit={addCategory}>
        {/* Category Name */}
        <div>
          <label>Category Name</label>
          <br />

          <input
            type="text"
            placeholder="Enter category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        {/* Type */}
        <div>
          <label>Type</label>
          <br />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>

        <br />

        {/* Amount */}
        <div>
          <label>Amount</label>
          <br />

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            min="0"
            step="0.01"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Add Category
        </button>
      </form>

      <hr />

      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>

              <td>{item.name}</td>

              <td>{item.type}</td>

              <td>
                ₹{Number(item.amount || 0).toFixed(2)}
              </td>

              <td>
                <button
                  onClick={() =>
                    deleteCategory(item.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td colSpan="5">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
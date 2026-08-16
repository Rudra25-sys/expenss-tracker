import { useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Salary", type: "Income", amount: 20000 },
    { id: 2, name: "Food", type: "Expense", amount: 5000 },
  ]);

  const [name, setName] = useState("");
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState(0);

  const addCategory = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    const newCategory = {
      id: Date.now(),
      name,
      type,
      amount,
    };

    setCategories([...categories, newCategory]);

    setName("");
    setType("Expense");
    setColor("#0d6efd");
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2>Categories</h2>

      {/* Summary */}
      <div>
        <h4>Total Categories: {categories.length}</h4>
        <h4>
          Income: {categories.filter((item) => item.type === "Income").length}
        </h4>
        <h4>
          Expense: {categories.filter((item) => item.type === "Expense").length}
        </h4>
      </div>

      <hr />

      {/* Add Category Form */}
      <form onSubmit={addCategory}>
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

        <div>
          <label>Color</label>
          <br />
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <br />

        <button type="submit">Add Category</button>
      </form>

      <hr />

      {/* Category Table */}
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Color</th>
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
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: item.color,
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>
                <button onClick={() => deleteCategory(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td colSpan="5">No categories found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env")
});

const db = require("./db");
const dashboardRoutes = require("./dashboard");
const incomeRoutes = require("./incame");
const expenseRoutes = require("./expenss");
const categoryRoutes = require("./categorie");
const registerRoutes = require("./register");
const deptRoutes = require("./debt");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/register", registerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/debt", deptRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker API is running"
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

const PORT = 5000;

db.ready
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
    process.exit(1);
  });
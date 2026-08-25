const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env")
});

const dashboardRoutes = require("./dashboard");
const incomeRoutes = require("./incame");
const expenseRoutes = require("./expenss");
const categoryRoutes = require("./categorie");
const registerRoutes = require("./register");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/register", registerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
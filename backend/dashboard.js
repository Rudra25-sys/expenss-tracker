const express = require("express");
const fs = require("fs");

const router = express.Router();

const DB_FILE = "./db.json";

function getDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

// GET /api/dashboard
router.get("/", (req, res) => {
  const db = getDB();

  const totalIncome = db.income.reduce(
    (total, item) => total + Number(item.amount),
    0
  );

  const totalExpense = db.expenses.reduce(
    (total, item) => total + Number(item.amount),
    0
  );

  const netProfit = totalIncome - totalExpense;

  res.json({
    totalIncome,
    totalExpense,
    netProfit
  });
});

module.exports = router;
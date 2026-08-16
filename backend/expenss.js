const express = require("express");
const fs = require("fs");

const router = express.Router();

const DB_FILE = "./db.json";

function getDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// GET all expenses
router.get("/", (req, res) => {
  const db = getDB();

  res.json(db.expenses);
});

// GET expense by ID
router.get("/:id", (req, res) => {
  const db = getDB();

  const expense = db.expenses.find(
    item => item.id === Number(req.params.id)
  );

  if (!expense) {
    return res.status(404).json({
      message: "Expense not found"
    });
  }

  res.json(expense);
});

// ADD expense
router.post("/", (req, res) => {
  const db = getDB();

  const {
    title,
    amount,
    category,
    date
  } = req.body;

  if (!title || !amount || !category || !date) {
    return res.status(400).json({
      message: "title, amount, category and date are required"
    });
  }

  const newExpense = {
    id: Date.now(),
    title,
    amount: Number(amount),
    category,
    date
  };

  db.expenses.push(newExpense);

  saveDB(db);

  res.status(201).json(newExpense);
});

// UPDATE expense
router.put("/:id", (req, res) => {
  const db = getDB();

  const index = db.expenses.findIndex(
    item => item.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Expense not found"
    });
  }

  db.expenses[index] = {
    ...db.expenses[index],
    ...req.body,
    amount: Number(req.body.amount)
  };

  saveDB(db);

  res.json(db.expenses[index]);
});

// DELETE expense
router.delete("/:id", (req, res) => {
  const db = getDB();

  const index = db.expenses.findIndex(
    item => item.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Expense not found"
    });
  }

  const deleted = db.expenses.splice(index, 1);

  saveDB(db);

  res.json({
    message: "Expense deleted",
    expense: deleted[0]
  });
});

module.exports = router;   
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

// GET all income
router.get("/", (req, res) => {
  const db = getDB();

  res.json(db.income);
});

// GET income by ID
router.get("/:id", (req, res) => {
  const db = getDB();

  const income = db.income.find(
    item => item.id === Number(req.params.id)
  );

  if (!income) {
    return res.status(404).json({
      message: "Income not found"
    });
  }

  res.json(income);
});

// ADD income
router.post("/", (req, res) => {
  const db = getDB();

  const { title, amount, date } = req.body;

  if (!title || !amount || !date) {
    return res.status(400).json({
      message: "title, amount and date are required"
    });
  }

  const newIncome = {
    id: Date.now(),
    title,
    amount: Number(amount),
    date
  };

  db.income.push(newIncome);

  saveDB(db);

  res.status(201).json(newIncome);
});

// UPDATE income
router.put("/:id", (req, res) => {
  const db = getDB();

  const index = db.income.findIndex(
    item => item.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Income not found"
    });
  }

  db.income[index] = {
    ...db.income[index],
    ...req.body,
    amount: Number(req.body.amount)
  };

  saveDB(db);

  res.json(db.income[index]);
});

// DELETE income
router.delete("/:id", (req, res) => {
  const db = getDB();

  const index = db.income.findIndex(
    item => item.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Income not found"
    });
  }

  const deleted = db.income.splice(index, 1);

  saveDB(db);

  res.json({
    message: "Income deleted",
    income: deleted[0]
  });
});

module.exports = router;
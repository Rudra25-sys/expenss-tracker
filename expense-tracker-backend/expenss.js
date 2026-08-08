const express = require("express");
const router = express.Router();

const { expenses } = require("../data/data");

// Get all expenses
router.get("/", (req, res) => {
  res.json(expenses);
});

// Add expense
router.post("/", (req, res) => {
  const expense = {
    id: Date.now(),
    ...req.body,
  };

  expenses.push(expense);

  res.json({
    message: "Expense Added",
    expense,
  });
});

// Delete expense
router.delete("/:id", (req, res) => {
  const index = expenses.findIndex(
    (e) => e.id == req.params.id
  );

  if (index === -1) {
    return res.status(404).json({ message: "Not Found" });
  }

  expenses.splice(index, 1);

  res.json({ message: "Expense Deleted" });
});

module.exports = router;  
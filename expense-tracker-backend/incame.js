const express = require("express");
const router = express.Router();

const { income } = require("../data/data");

// Get income
router.get("/", (req, res) => {
  res.json(income);
});

// Add income
router.post("/", (req, res) => {
  const item = {
    id: Date.now(),
    ...req.body,
  };

  income.push(item);

  res.json({
    message: "Income Added",
    item,
  });
});

module.exports = router;
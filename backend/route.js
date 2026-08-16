const express = require("express");

const router = express.Router();

const controller = require("../controllers/expenseController");

router.get("/expenses", controller.getExpenses);

router.post("/expenses", controller.addExpense);

module.exports = router;
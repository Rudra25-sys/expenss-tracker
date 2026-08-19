const express = require("express");
const db = require("./db");

const router = express.Router();


// =============================
// DASHBOARD SUMMARY
// =============================
router.get("/", (req, res) => {

  const incomeSql = `
    SELECT COALESCE(SUM(amount), 0) AS totalIncome
    FROM income
  `;

  const expenseSql = `
    SELECT COALESCE(SUM(amount), 0) AS totalExpense
    FROM expenses
  `;

  const categorySql = `
    SELECT
      COALESCE(SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END), 0) AS totalIncomeCategories,
      COALESCE(SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END), 0) AS totalExpenseCategories
    FROM categories
  `;

  db.query(incomeSql, (incomeErr, incomeResult) => {

    if (incomeErr) {
      console.error(incomeErr);

      return res.status(500).json({
        message: "Error fetching income total"
      });
    }

    db.query(expenseSql, (expenseErr, expenseResult) => {

      if (expenseErr) {
        console.error(expenseErr);

        return res.status(500).json({
          message: "Error fetching expense total"
        });
      }

      db.query(categorySql, (categoryErr, categoryResult) => {

        if (categoryErr) {
          console.error(categoryErr);

          return res.status(500).json({
            message: "Error fetching category totals"
          });
        }

        const totalIncome =
          Number(incomeResult[0].totalIncome) + Number(categoryResult[0].totalIncomeCategories);

        const totalExpense =
          Number(expenseResult[0].totalExpense) + Number(categoryResult[0].totalExpenseCategories);

        const netProfit =
          totalIncome - totalExpense;

        res.json({
          totalIncome,
          totalExpense,
          netProfit
        });
      });
    });
  });
});


module.exports = router;
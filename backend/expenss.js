const express = require("express");
const db = require("./db");

const router = express.Router();


// =============================
// GET ALL EXPENSES
// =============================
router.get("/", (req, res) => {

  const sql = `
    SELECT
      id,
      title,
      amount,
      category,
      DATE_FORMAT(date, '%Y-%m-%d') AS date
    FROM expenses
    ORDER BY date DESC
  `;

  db.query(sql, (err, results) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Error fetching expenses"
      });
    }

    res.json(results);
  });
});


// =============================
// GET EXPENSE BY ID
// =============================
router.get("/:id", (req, res) => {

  const sql = `
    SELECT
      id,
      title,
      amount,
      category,
      DATE_FORMAT(date, '%Y-%m-%d') AS date
    FROM expenses
    WHERE id = ?
  `;

  db.query(sql, [req.params.id], (err, results) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json(results[0]);
  });
});


// =============================
// ADD EXPENSE
// =============================
router.post("/", (req, res) => {

  const {
    title,
    amount,
    category,
    date
  } = req.body;

  if (!title || !amount || !date) {
    return res.status(400).json({
      message: "title, amount and date are required"
    });
  }

  const categoryName = category ? String(category).trim() : "General";

  const sql = `
    INSERT INTO expenses
    (title, amount, category, date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      Number(amount),
      categoryName,
      date
    ],
    (err, result) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Error adding expense"
        });
      }

      res.status(201).json({
        id: result.insertId,
        title,
        amount: Number(amount),
        category: categoryName,
        date
      });
    }
  );
});


// =============================
// UPDATE EXPENSE
// =============================
router.put("/:id", (req, res) => {

  const {
    title,
    amount,
    category,
    date
  } = req.body;

  const categoryName = category ? String(category).trim() : "General";

  const sql = `
    UPDATE expenses
    SET
      title = ?,
      amount = ?,
      category = ?,
      date = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      title,
      Number(amount),
      categoryName,
      date,
      req.params.id
    ],
    (err, result) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Error updating expense"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Expense not found"
        });
      }

      res.json({
        id: Number(req.params.id),
        title,
        amount: Number(amount),
        category: categoryName,
        date
      });
    }
  );
});


// =============================
// DELETE EXPENSE
// =============================
router.delete("/:id", (req, res) => {

  const sql = "DELETE FROM expenses WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Error deleting expense"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json({
      message: "Expense deleted successfully"
    });
  });
});


module.exports = router;
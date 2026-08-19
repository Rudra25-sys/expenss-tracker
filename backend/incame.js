const express = require("express");
const db = require("./db");

const router = express.Router();


// =============================
// GET ALL INCOME
// =============================
router.get("/", (req, res) => {

  const sql = `
    SELECT 
      id,
      title,
      amount,
      category,
      DATE_FORMAT(date, '%Y-%m-%d') AS date
    FROM income
    ORDER BY date DESC
  `;

  db.query(sql, (err, results) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Error fetching income"
      });
    }

    res.json(results);
  });
});


// =============================
// GET INCOME BY ID
// =============================
router.get("/:id", (req, res) => {

  const sql = `
    SELECT 
      id,
      title,
      amount,
      category,
      DATE_FORMAT(date, '%Y-%m-%d') AS date
    FROM income
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
        message: "Income not found"
      });
    }

    res.json(results[0]);
  });
});


// =============================
// ADD INCOME
// =============================
router.post("/", (req, res) => {

  const { title, amount, category, date } = req.body;

  if (!title || !amount || !date) {
    return res.status(400).json({
      message: "title, amount and date are required"
    });
  }

  const categoryName = category ? String(category).trim() : "General";

  const sql = `
    INSERT INTO income (title, amount, category, date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, Number(amount), categoryName, date],
    (err, result) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Error adding income"
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
// UPDATE INCOME
// =============================
router.put("/:id", (req, res) => {

  const { title, amount, category, date } = req.body;

  const categoryName = category ? String(category).trim() : "General";

  const sql = `
    UPDATE income
    SET title = ?, amount = ?, category = ?, date = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [title, Number(amount), categoryName, date, req.params.id],
    (err, result) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Error updating income"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Income not found"
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
// DELETE INCOME
// =============================
router.delete("/:id", (req, res) => {

  const sql = "DELETE FROM income WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Error deleting income"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Income not found"
      });
    }

    res.json({
      message: "Income deleted successfully"
    });
  });
});


module.exports = router;
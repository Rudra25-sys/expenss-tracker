const express = require("express");
const db = require("./db");

const router = express.Router();


// =============================
// GET ALL CATEGORIES
// =============================
router.get("/", (req, res) => {

  const sql = `
    SELECT id, name, type, amount, color
    FROM categories
    ORDER BY id DESC
  `;

  db.query(sql, (err, results) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Error fetching categories"
      });
    }

    res.json(results);
  });
});


// =============================
// ADD CATEGORY
// =============================
router.post("/", (req, res) => {

  const {
    name,
    type,
    amount,
    color
  } = req.body;

  if (!name || !type || amount === undefined || amount === null || amount === "") {
    return res.status(400).json({
      message: "Category name, type and amount are required"
    });
  }

  const cleanName = name.trim();
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount) || numericAmount < 0) {
    return res.status(400).json({
      message: "Amount must be a valid non-negative number"
    });
  }

  const checkSql = `
    SELECT id
    FROM categories
    WHERE LOWER(name) = LOWER(?)
  `;

  db.query(checkSql, [cleanName], (err, results) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database error"
      });
    }

    if (results.length > 0) {
      return res.status(409).json({
        message: "Category already exists"
      });
    }

    const insertSql = `
      INSERT INTO categories
      (name, type, amount, color)
      VALUES (?, ?, ?, ?)
    `;

    const categoryColor = color || "#0d6efd";

    db.query(
      insertSql,
      [cleanName, type, numericAmount, categoryColor],
      (err, result) => {

        if (err) {
          console.error(err);

          return res.status(500).json({
            message: "Error adding category"
          });
        }

        res.status(201).json({
          id: result.insertId,
          name: cleanName,
          type,
          amount: numericAmount,
          color: categoryColor
        });
      }
    );
  });
});


// =============================
// DELETE CATEGORY
// =============================
router.delete("/:id", (req, res) => {

  const sql = "DELETE FROM categories WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Error deleting category"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.json({
      message: "Category deleted successfully"
    });
  });
});


module.exports = router;
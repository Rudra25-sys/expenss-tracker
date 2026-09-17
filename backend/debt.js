const express = require("express");
const db = require("./db");

const router = express.Router();

router.get("/", (req, res) => {
  const sql = `
    SELECT id, name, title, amount, DATE_FORMAT(date, '%Y-%m-%d') AS date
    FROM debt
    ORDER BY date DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching debt:", err);
      return res.status(500).json({ message: "Error fetching debt" });
    }

    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { name, title, amount, date } = req.body;

  if (!name || !title || !amount || !date) {
    return res.status(400).json({
      message: "name, title, amount and date are required"
    });
  }

  const sql = `
    INSERT INTO debt (name, title, amount, date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, title, Number(amount), date], (err, result) => {
    if (err) {
      console.error("Error adding debt:", err);
      return res.status(500).json({ message: "Error adding debt" });
    }

    res.status(201).json({
      id: result.insertId,
      name,
      title,
      amount: Number(amount),
      date
    });
  });
});

module.exports = router;
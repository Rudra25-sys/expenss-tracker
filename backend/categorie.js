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

// GET categories
router.get("/", (req, res) => {
  const db = getDB();

  res.json(db.categories);
});

// ADD category
router.post("/", (req, res) => {
  const db = getDB();

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Category name is required"
    });
  }

  const categoryExists = db.categories.some(
    category =>
      category.name.toLowerCase() === name.toLowerCase()
  );

  if (categoryExists) {
    return res.status(409).json({
      message: "Category already exists"
    });
  }

  const newCategory = {
    id: Date.now(),
    name
  };

  db.categories.push(newCategory);

  saveDB(db);

  res.status(201).json(newCategory);
});

// DELETE category
router.delete("/:id", (req, res) => {
  const db = getDB();

  const index = db.categories.findIndex(
    category => category.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Category not found"
    });
  }

  const deleted = db.categories.splice(index, 1);

  saveDB(db);

  res.json({
    message: "Category deleted",
    category: deleted[0]
  });
});

module.exports = router;
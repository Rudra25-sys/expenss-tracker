const express = require("express");
const router = express.Router();

const { categories } = require("../data/data");

router.get("/", (req, res) => {
  res.json(categories);
});

router.post("/", (req, res) => {
  const category = {
    id: Date.now(),
    name: req.body.name,
  };

  categories.push(category);

  res.json(category);
});

module.exports = router;
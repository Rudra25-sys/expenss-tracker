const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const DB_FILE = path.join(__dirname, "register.json");

function getUsers() {
  if (!fs.existsSync(DB_FILE)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(
    DB_FILE,
    JSON.stringify(users, null, 2)
  );
}

// REGISTER
router.post("/", (req, res) => {
  const {
    username,
    email,
    password
  } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email and password are required"
    });
  }

  const users = getUsers();

  const userExists = users.some(
    (user) =>
      user.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (userExists) {
    return res.status(409).json({
      message: "Email already registered"
    });
  }

  const newUser = {
    id: Date.now(),
    username: username.trim(),
    email: email.trim(),
    password
  };

  users.push(newUser);

  saveUsers(users);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    }
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const {
    email,
    password
  } = req.body;

  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
});

module.exports = router;
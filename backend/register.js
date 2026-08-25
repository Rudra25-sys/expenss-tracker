const express = require("express"); 
const fs = require("fs"); 
const path = require("path"); 
const nodemailer = require("nodemailer"); 
const bcrypt = require("bcryptjs");
 
const router = express.Router(); 
 
const DB_FILE = path.join(__dirname, "register.json"); 
 
const mailer = nodemailer.createTransport({ 
  service: "gmail", 
  auth: { 
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_APP_PASSWORD 
  } 
}); 
 
function createOtp() { 
  return String(Math.floor(100000 + Math.random() * 900000)); 
} 
 
async function sendOtp(email, otp, subject) { 
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) { 
    throw new Error("Gmail SMTP is not configured"); 
  } 
 
  await mailer.sendMail({ 
    from: process.env.GMAIL_USER, 
    to: email, 
    subject, 
    text: `Your Money Tracker verification code is ${otp}. It expires in 10 minutes.` 
  }); 
} 
 
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
router.post("/", async (req, res) => { 
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

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters"
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
    password: await bcrypt.hash(password, 12),
    verified: true
  }; 

  users.push(newUser); 
  saveUsers(users); 

  res.status(201).json({ 
    message: "Account created successfully", 
    email: newUser.email 
  }); 
}); 
 
// LOGIN 
router.post("/login", async (req, res) => { 
  const { 
    email, 
    password 
  } = req.body; 
 
  const users = getUsers(); 
 
  const user = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
  let passwordMatches = false;

  if (user?.password?.startsWith("$2")) {
    passwordMatches = await bcrypt.compare(password, user.password);
  } else if (user) {
    passwordMatches = user.password === password;
    if (passwordMatches) {
      user.password = await bcrypt.hash(password, 12);
      saveUsers(users);
    }
  }
 
  if (!user || !passwordMatches || user.verified === false) { 
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
 
// SEND PASSWORD RESET OTP 
router.post("/forgot-password", async (req, res) => { 
  const { email } = req.body; 
  const users = getUsers(); 
  const user = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase()); 
 
  if (!user) { 
    return res.json({ message: "If that email is registered, a reset code has been sent" }); 
  } 
 
  const otp = createOtp(); 
  user.resetOtp = otp; 
  user.resetExpires = Date.now() + 10 * 60 * 1000; 
 
  try { 
    await sendOtp(user.email, otp, "Reset your Money Tracker password"); 
    saveUsers(users); 
  } catch (error) { 
    console.error("Password reset email error:", error.message); 
    return res.status(503).json({ message: "Could not send reset email. Check Gmail SMTP settings." }); 
  } 
 
  res.json({ message: "If that email is registered, a reset code has been sent" }); 
}); 
 
// RESET PASSWORD WITH OTP 
router.post("/reset-password", (req, res) => { 
  const { email, otp, password } = req.body; 
  if (!email || !otp || !password) { 
    return res.status(400).json({ message: "Email, code and new password are required" }); 
  } 
 
  const users = getUsers(); 
  const user = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase()); 
  if (!user || user.resetOtp !== String(otp) || user.resetExpires < Date.now()) { 
    return res.status(400).json({ message: "Invalid or expired reset code" }); 
  } 
 
  user.password = bcrypt.hashSync(password, 12);
  delete user.resetOtp; 
  delete user.resetExpires; 
  saveUsers(users); 
  res.json({ message: "Password reset successfully" }); 
}); 

module.exports = router;
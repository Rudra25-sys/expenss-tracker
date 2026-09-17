const mysql = require("mysql2");

const adminConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rudra@25",
  multipleStatements: true
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rudra@25",
  database: "expense_tracker",
  multipleStatements: true
});

const tableQueries = [
  `CREATE TABLE IF NOT EXISTS income (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL DEFAULT 'General',
    date DATE NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL DEFAULT 'General',
    date DATE NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    color VARCHAR(20) NOT NULL DEFAULT '#0d6efd'
  )`,
  `CREATE TABLE IF NOT EXISTS debt (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL
  )`
];

const initializeDatabase = () => new Promise((resolve, reject) => {
  adminConnection.connect((adminErr) => {
    if (adminErr) {
      console.error("MySQL admin connection failed:", adminErr);
      return reject(adminErr);
    }

    adminConnection.query("CREATE DATABASE IF NOT EXISTS expense_tracker", (createErr) => {
      if (createErr) {
        console.error("Database creation failed:", createErr);
        adminConnection.end();
        return reject(createErr);
      }

      db.connect((dbErr) => {
        if (dbErr) {
          console.error("MySQL app connection failed:", dbErr);
          adminConnection.end();
          return reject(dbErr);
        }

        const runNext = (index) => {
          if (index >= tableQueries.length) {
            adminConnection.end();
            console.log("MySQL connected successfully");
            return resolve();
          }

          db.query(tableQueries[index], (tableErr) => {
            if (tableErr) {
              console.error("Table setup failed:", tableErr);
              adminConnection.end();
              return reject(tableErr);
            }

            runNext(index + 1);
          });
        };

        runNext(0);
      });
    });
  });
});

db.initializeDatabase = initializeDatabase;
db.ready = initializeDatabase();

module.exports = db;
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rudra@25"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }

  db.query("CREATE DATABASE IF NOT EXISTS expense_tracker", (createErr) => {
    if (createErr) {
      console.error("Database setup failed:", createErr);
      return;
    }

    db.query("USE expense_tracker", (useErr) => {
      if (useErr) {
        console.error("Database selection failed:", useErr);
        return;
      }

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
        )`
      ];

      const createNextTable = (index) => {
        if (index === tableQueries.length) {
          console.log("MySQL connected successfully");
          return;
        }

        db.query(tableQueries[index], (tableErr) => {
          if (tableErr) {
            console.error("Table setup failed:", tableErr);
            return;
          }

          createNextTable(index + 1);
        });
      };

      createNextTable(0);
    });
  });
});

module.exports = db;
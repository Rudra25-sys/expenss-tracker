const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/dashboard", require("./routes/dashboard"));
app.use("/expenses", require("./routes/expenses"));
app.use("/income", require("./routes/income"));
app.use("/categories", require("./routes/categories"));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
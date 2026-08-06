const fs = require("fs");
const path = require("path");

// JSON file
const DATA_FILE = path.join(__dirname, "data.json");

// Create file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(
            {
                incomes: [],
                expenses: [],
                categories: []
            },
            null,
            2
        )
    );
}

// Read data
function readData() {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Save data
function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// -------------------- INCOME --------------------

function addIncome(title, amount) {
    const data = readData();

    data.incomes.push({
        id: Date.now(),
        title,
        amount,
        date: new Date().toISOString()
    });

    saveData(data);
}

// -------------------- EXPENSE --------------------

function addExpense(title, category, amount) {
    const data = readData();

    data.expenses.push({
        id: Date.now(),
        title,
        category,
        amount,
        date: new Date().toISOString()
    });

    saveData(data);
}

// -------------------- CATEGORY --------------------

function addCategory(name) {
    const data = readData();

    data.categories.push({
        id: Date.now(),
        name
    });

    saveData(data);
}

// -------------------- GET DATA --------------------

function getIncomes() {
    return readData().incomes;
}

function getExpenses() {
    return readData().expenses;
}

function getCategories() {
    return readData().categories;
}

// -------------------- Example --------------------

addCategory("Food");
addIncome("Salary", 50000);
addExpense("Pizza", "Food", 500);

console.log("Incomes:", getIncomes());
console.log("Expenses:", getExpenses());
console.log("Categories:", getCategories());
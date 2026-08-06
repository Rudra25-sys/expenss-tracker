const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getDashboard = async(req,res)=>{

    const incomes = await Income.find();

    const expenses = await Expense.find();

    const totalIncome = incomes.reduce((a,b)=>a+b.amount,0);

    const totalExpense = expenses.reduce((a,b)=>a+b.amount,0);

    res.json({

        totalIncome,

        totalExpense,

        netProfit: totalIncome-totalExpense

    });

};
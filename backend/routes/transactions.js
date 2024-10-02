const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');

/* 
    This file will handle the routes for adding, getting, and deleting incomes and expenses
    It will use the functions from the income and expense controllers
*/
const router = require('express').Router();

router.post('/add-income', addIncome)
router.get('/get-incomes', getIncomes)
router.delete('/delete-income/:id', deleteIncome)

router.post('/add-expense', addExpense)
router.get('/get-expenses', getExpense)
router.delete('/delete-expense/:id', deleteExpense)

module.exports = router;
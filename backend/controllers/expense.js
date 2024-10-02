const ExpenseSchema = require('../models/ExpenseModel');

/* 
    This function will add the expense to the database
    The function will take the title, amount, category, description, and date as input
    It will then create a new instance of the ExpenseSchema and save it to the database
    If any of the fields are missing or the amount is not a positive number, it will return an error
    If the expense is successfully added, it will return a success message
    If there is an error, it will return a server error message
*/
exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    // Error handling
    try{
        if (!title || !category || !description || !date) {
            return res.status(400).json({error: "All fields are required!"});
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({error: "Amount must be a positive number!"});
        }
        await income.save();
        res.status(200).json({message: "Expense added successfully!"});

    } catch (error) {
        res.status(500).json({error: "Server Error"});
    }

    console.log(income);
} 

/* 
    This function will get the expenses from the database
    It will return all the expenses sorted by the createdAt field in descending order
    If there is an error, it will return a server error message
*/
exports.getExpense = async (req, res) => {
    try{
        const incomes = await ExpenseSchema.find().sort({createdAt: -1});
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({error: "Server Error"});
    }
}

/* 
    This function will delete the expense from the database
    It will take the id of the expense as input
    It will then find the expense by id and delete it
    If the expense is successfully deleted, it will return a success message
    If there is an error, it will return a server error message
*/
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: "Expense deleted successfully!"});
        })
        .catch((err) => {
            res.status(500).json({error: "Server Error"});
        })
}

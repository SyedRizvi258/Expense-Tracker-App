const IncomeSchema = require('../models/IncomeModel');

/* 
    This function will add the income to the database
    The function will take the title, amount, category, description, and date as input
    It will then create a new instance of the IncomeSchema and save it to the database
    If any of the fields are missing or the amount is not a positive number, it will return an error
    If the income is successfully added, it will return a success message
    If there is an error, it will return a server error message
*/
exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try{
        if (!title || !category || !description || !date) {
            return res.status(400).json({error: "All fields are required!"});
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({error: "Amount must be a positive number!"});
        }
        await income.save();
        res.status(200).json({message: "Income added successfully!"});

    } catch (error) {
        res.status(500).json({error: "Server Error"});
    }

    console.log(income);
}

/* 
    This function will get the incomes from the database
    It will return all the incomes sorted by the createdAt field in descending order
    If there is an error, it will return a server error message
*/
exports.getIncomes = async (req, res) => {
    try{
        const incomes = await IncomeSchema.find().sort({createdAt: -1});
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({error: "Server Error"});
    }
}

/* 
    This function will delete the income from the database
    It will take the id of the income as input
    It will then find the income by id and delete it
    If the income is successfully deleted, it will return a success message
    If there is an error, it will return a server error message
*/
exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: "Income deleted successfully!"});
        })
        .catch((err) => {
            res.status(500).json({error: "Server Error"});
        })
}

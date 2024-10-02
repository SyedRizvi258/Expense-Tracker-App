const mongoose = require('mongoose');

// Create a schema for the expenses
const ExpenseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },

    amount:{
        type: Number,
        required: true,
        trim: true,
        maxLength: 20
    },

    type:{
        type: String,
        default: 'expense'
    },

    category:{
        type: String,
        required: true,
        trim: true
    },

    description:{
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },

    date:{
        type: Date,
        required: true
    },

}, {timestamps: true});

module.exports = mongoose.model('Expense', ExpenseSchema);
import React, { useContext, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/';

const GlobalContext = React.createContext();

/*
    This component is used to provide the global state to the application. It contains the state for incomes, expenses, and error.
    It also contains functions to add, get, and delete incomes and expenses. It also contains functions to calculate the total income, total expenses, and total balance.
*/
export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // incomes functions
    const addIncome = async(income) => {
        await axios.post(`${BASE_URL}add-income`, income)
        .catch((err) => {
            setError(err.response.data.error);
        })
        getIncomes();
    }
    const getIncomes = async() => {
        const response = await axios.get(`${BASE_URL}get-incomes`);
        setIncomes(response.data);
    }

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`);
        getIncomes();
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += income.amount;
        })
        return totalIncome;
    }

    // expenses functions
    const addExpense = async(income) => {
        await axios.post(`${BASE_URL}add-expense`, income)
        .catch((err) => {
            setError(err.response.data.error);
        })
        getExpenses();
    }

    const getExpenses = async() => {
        const response = await axios.get(`${BASE_URL}get-expenses`);
        setExpenses(response.data);
    }

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`);
        getExpenses();
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) => {
            totalIncome += income.amount;
        })
        return totalIncome;
    }

    // total balance
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    }

    // transaction history
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })
        return history.slice(0, 3);
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}
import React from 'react';
import styled from 'styled-components';
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

import {Line} from 'react-chartjs-2';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJS.register(
    CategoryScale,
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend, 
    ArcElement
);

// This component displays a line chart that shows the user's income and expenses over time.
function Chart() {
    const {incomes, expenses} = useGlobalContext();

    const data = {
        labels: incomes.map((inc) =>{
            const {date} = inc;
            return dateFormat(date); 
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income;
                        return amount;
                    })
                ],
                backgroundColor: 'green',
                borderColor: 'green',
                tension: .2
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense;
                        return amount;
                    })
                ],
                backgroundColor: 'red',
                borderColor: 'red',
                tension: .2
            }
        ]
    }

    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart;



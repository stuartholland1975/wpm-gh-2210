/** @format */

import React from 'react';
import {Cell, Pie, PieChart} from 'recharts';
import {formatNumberNoDecimals} from "../src/functions/formattingFunctions";

const data = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300},
    {name: 'Group D', value: 200},
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props) => {
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        orderValue,
        name,
    } = props
    console.log(props)
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill='white'
            textAnchor={x > cx ? 'start' : 'end'}
           // dominantBaseline='central'
        >
            {`${(percent * 100).toFixed(0)}%`}  <br/> {formatNumberNoDecimals(orderValue)} <br/> {name}

        </text>
    );
};


export default function (props) {

    const chartData = props.data.map(item => ({
        area: item.description,
        orderValue: Number(item.orderValue)
    }))
    console.log(chartData)
    return (
        <PieChart width={800} height={800}>
            <Pie
                data={chartData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={renderCustomizedLabel}
                fill='#8884d8'
                dataKey='orderValue'
                nameKey='area'
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                ))}
            </Pie>
        </PieChart>

    );
}



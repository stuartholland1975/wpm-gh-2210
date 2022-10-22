/** @format */

import React from 'react';
import { AgChartsReact } from 'ag-charts-react';

const WorkCompleteByPeriodArea = ({ rowData }) => {
	const chartRef = React.useRef();

	const barOptions = {
		data: rowData,

		title: {
			text: 'Work Complete By Period',
		},

		series: [
			{
				type: 'column',
				xKey: 'period',
				yKey: 'north',
				yName: 'North',
				stacked: true,
			},

			{
				type: 'column',
				xKey: 'period',
				yKey: 'central',
				yName: 'Central',
				stacked: true,
			},
			{
				type: 'column',
				xKey: 'period',
				yKey: 'south',
				yName: 'South',
				stacked: true,
			},
			{
				type: 'column',
				xKey: 'period',
				yKey: 'admin',
				yName: 'Admin',
				stacked: true,
			},
			{
				type: 'column',
				xKey: 'period',
				yKey: 'misc',
				yName: 'Misc',
				stacked: true,
			},
			{
				type: 'column',
				xKey: 'period',
				yKey: 'test',
				yName: 'Test',
				stacked: true,
			},
		],
		axes: [
			{
				type: 'category',
				position: 'bottom',
				title: {
					text: 'Period',
					enabled: true,
				},
			},
			{
				type: 'number',
				position: 'left',
				title: {
					text: 'Value Complete (£)',
					enabled: true,
				},
				label: {
					format: 'n',
				},
			},
		],
		theme: 'ag-pastel',

		legend: {
			position: 'right',
		},
	};

	return <AgChartsReact options={barOptions} ref={chartRef} />;
};

export default WorkCompleteByPeriodArea;

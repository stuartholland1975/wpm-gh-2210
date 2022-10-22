/** @format */

import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import {formatNumberGridNoDecimals} from '../../../functions/formattingFunctions';

const PeriodsGrid = ({ rowData }) => {
	const columnDefs = React.useMemo(() => [
		{
			field: 'periodNumber',
		},
		{
			field: 'weekCommencingDate',
			valueFormatter: (params) =>
				new Date(params.value).toLocaleDateString('en-GB'),
		},
		{
			field: 'weekEndingDate',
			valueFormatter: (params) =>
				new Date(params.value).toLocaleDateString('en-GB'),
		},
		{
			field: 'year',
		},
		{
			field: 'week',
		},
		{
			field: 'worksValueCurrent',
			valueFormatter: formatNumberGridNoDecimals,
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
			headerName: 'Works Value',
		},
		{
			field: 'current',
			headerClass: 'text-center',
			cellRenderer: (params) => {
				return params.data.current === true ? (
					<div style={{ textAlign: 'center', marginTop: 5 }}>
						<DoneIcon color='submit' />
					</div>
				) : (
					<div style={{ textAlign: 'center', marginTop: 5 }}>
						<ClearIcon color='error' />
					</div>
				);
			},
		},

		{
			field: 'closed',
			headerClass: 'text-center',
			cellRenderer: (params) => {
				return params.data.closed === true ? (
					<div style={{ textAlign: 'center', marginTop: 5 }}>
						<DoneIcon color='submit' />
					</div>
				) : (
					<div style={{ textAlign: 'center', marginTop: 5 }}>
						<ClearIcon color='error' />
					</div>
				);
			},
		},
	]);
	const defaultColDef = React.useMemo(
		() => ({
			filter: true,
			sortable: true,
			resizable: true,
			flex: 1,
		}),
		[],
	);
	return (
		<AgGridReact
			className='ag-theme-alpine'
			animateRows='true'
			columnDefs={columnDefs}
			defaultColDef={defaultColDef}
			rowData={rowData}
			domLayout='autoHeight'
			pagination={true}
			paginationPageSize={20}
			suppressRowClickSelection={true}
		/>
	);
};

export default PeriodsGrid;

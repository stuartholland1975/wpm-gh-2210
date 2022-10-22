/** @format */

import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import {formatNumberGridNoDecimals,} from '../../../functions/formattingFunctions';

const ProjectsAvailableForApplication = ({ rowData }) => {
	const [columnDefs, setColumnDefs] = React.useState([
		{
			field: 'orderNumber',
			headerName: 'Project No',
		},
		{
			field: 'projectTitle',
			headerName: 'Project Title',
			flex: 2,
		},
		{ field: 'area' },
		{
			field: 'workType',
			flex: 1.5,
		},
		{
			headerName: 'Order Val',
			valueGetter: (params) => Number(params.data.orderValueTotal),
			valueFormatter: formatNumberGridNoDecimals,
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},
		{
			headerName: 'Done Val',
			valueGetter: (params) => Number(params.data.orderValueTotalComplete),
			valueFormatter: formatNumberGridNoDecimals,
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},
		{
			headerName: 'Applied Val',
			field: 'orderValueTotalApplied',
			valueFormatter: formatNumberGridNoDecimals,
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},
		{
			headerName: 'Value Available',
			valueFormatter: formatNumberGridNoDecimals,
			valueGetter: (params) =>
				params.data.orderValueTotalComplete -
				params.data.orderValueTotalApplied,
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
			cellStyle: { fontWeight: 'bold' },
		},
		{
			headerName: 'Locations',
			field: 'locationCount',
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},

		{
			headerName: 'Items',
			field: 'itemCount',
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
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
			rowSelection='single'
			// ref={gridRef}
			domLayout='autoHeight'
			enableCellChangeFlash={true}
			pagination={true}
			paginationPageSize={20}
			// onSelectionChanged={onSelectionChanged}
			suppressRowClickSelection={true}
		/>
	);
};

export default ProjectsAvailableForApplication;

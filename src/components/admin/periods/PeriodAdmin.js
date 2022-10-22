/** @format */

import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_PERIODS_WITH_VALUES} from '../../../api-calls/queries/misc';
import PeriodsGrid from '../../grids/grids/PeriodsGrid';
import PeriodAdminButtons from './PeriodAdminButtons';

const PeriodAdmin = () => {
	const [rowData, setRowData] = React.useState([]);
	const { loading } = useQuery(GET_PERIODS_WITH_VALUES, {
		onCompleted: (data) => setRowData(data.periodWithValues.nodes),
	});
	if (loading) return null;
	console.log(rowData);
	return (
		<div>
			<PeriodAdminButtons />
			<PeriodsGrid rowData={rowData} />
		</div>
	);
};

export default PeriodAdmin;

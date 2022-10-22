/** @format */

import React from 'react';
import ApplicationsGrid from '../grids/grids/ApplicationsGrid';
import {useQuery} from '@apollo/client';
import {GET_APPLICATION_HEADERS, GET_PROJECTS_AVAILABLE_FOR_APPLICATION,} from '../../api-calls/queries/applications';
import ProjectsAvailableForApplication from '../grids/grids/ProjectsAvailableForApplication';
import {Box} from '@mui/material';

const Applications = () => {
	const [rowData, setRowData] = React.useState([]);
	const [availableProjects, setAvailableProjects] = React.useState([]);
	const { loading: headersLoading } = useQuery(GET_APPLICATION_HEADERS, {
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
		onCompleted: (data) =>
			setRowData(data.applicationSummaryWithCumulativeValues.nodes),
	});

	const { loading: availableProjectsLoading } = useQuery(
		GET_PROJECTS_AVAILABLE_FOR_APPLICATION,
		{
			onCompleted: (data) =>
				setAvailableProjects(
					data.wpmGraphqlGetOrdersAvailableForApplication.nodes,
				),
		},
	);

	if (headersLoading || availableProjectsLoading) return null;
	return (
		<Box>
			<Box>
				<div className='grid-title'>APPLICATION LISTING</div>
				<ApplicationsGrid rowData={rowData} />
			</Box>

			<Box mt={2}>
				<div className='grid-title'>PROJECTS AVAILABLE FOR APPLICATION</div>
				<ProjectsAvailableForApplication rowData={availableProjects} />
			</Box>
		</Box>
	);
};

export default Applications;

/** @format */

import {useRoutes} from 'react-router-dom';

import React from 'react';
import ProjectAdmin from './projects/ProjectAdmin';
import DocumentAdmin from './documents/DocumentAdmin';
import ImportProjectDetails from './projects/ImportProjectDetails';
import ApplicationAdmin from "./applications/ApplicationAdmin";
import PeriodAdmin from "./periods/PeriodAdmin";

const AdminRoutes = () => {
	return useRoutes([
		{
			path: 'projects',
			element: <ProjectAdmin />,
			children: [
				{
					path: 'import',
					element: <ImportProjectDetails />,
				},
			],
		},
		{
			path: 'documents',
			element: <DocumentAdmin />,
		},
		{
			path: 'applications',
			element: <ApplicationAdmin/>
		},
		{
			path:'periods',
			element: <PeriodAdmin/>
		}
	]);
};

export default AdminRoutes;

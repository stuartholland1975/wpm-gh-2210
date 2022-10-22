/** @format */

import ProjectHeaderGrid from '../grids/grids/ProjectHeaderGrid';
import {gridSelectionsInitialValue, gridSelectionsVar} from '../../cache';
import React from 'react';

const ProjectHeaders = () => {
	React.useEffect(() => {
		gridSelectionsVar(gridSelectionsInitialValue);
	}, []);
	return <ProjectHeaderGrid/>;
};

export default ProjectHeaders;

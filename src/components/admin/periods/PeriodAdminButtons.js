/** @format */

import React from 'react';
import {Button, Grid} from '@mui/material';

const PeriodAdminButtons = () => {
	return (
		<Grid container={true} columns={4} mb={2}>
			<Grid item xs={1}>
				<Button>Button</Button>
			</Grid>
			<Grid item xs={1}>
				<Button>Button</Button>
			</Grid>
			<Grid item xs={1}>
				<Button>Button</Button>
			</Grid>
			<Grid item xs={1}>
				<Button>Button</Button>
			</Grid>
		</Grid>
	);
};

export default PeriodAdminButtons;

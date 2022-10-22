/** @format */

import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

export const GridButton = (props) => {
	const {path} = props;
	const navigate = useNavigate();

	const buttonClicked = () => {
		navigate({pathname: path})
	};
	return (
		<Button
			sx={{borderRadius: 0, border: 0, m: 0}}
			color='navigation'
			onClick={buttonClicked}
			//	onMouseOver={onButtonMouseOver}
				>
			details
		</Button>
	);
};

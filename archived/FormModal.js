/** @format */

import CloseIcon from '@mui/icons-material/Close';
import {Box, Button, Dialog, DialogContent, DialogTitle, IconButton,} from '@mui/material';
import {useModal} from 'react-modal-hook';

const FormModal = (props) => {
	const { title, children, buttonLabel, buttonColor } = props;
	const [showModal, hideModal] = useModal(() => (
		<Dialog open onClose={hideModal} maxWidth='lg'>
			<DialogTitle id='id'>
				<Box display='flex' alignItems='center'>
					<Box flexGrow={1}>{title}</Box>
					<Box>
						<IconButton onClick={hideModal}>
							<CloseIcon />
						</IconButton>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	));

	return (
		<Button color={buttonColor} onClick={showModal}>
			{buttonLabel}
		</Button>
	);
};

export default FormModal;

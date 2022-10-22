/** @format */

import { useMutation, useReactiveVar } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { confirmAlert } from 'react-confirm-alert';
import { DELETE_PROJECT_HEADER } from '../src/api-calls/mutations/project-mutations';
import { gridSelectionsVar } from '../src/cache';

const DeleteProjectHeader = () => {
	const selectedProject = useReactiveVar(gridSelectionsVar).selectedOrder;
	const [DeleteProject] = useMutation(DELETE_PROJECT_HEADER, {
		variables: { id: selectedProject.id },
	});

	const handleDeleteProjectHeader = () => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='custom-ui'>
						<h2>Confirm Deletion</h2>
						<h4>{`Are You Sure You Want To Delete Project Number ${selectedProject[0].orderNumber} ?`}</h4>
						<button
							onClick={() =>
								DeleteProject().then(() => {
									onClose();
									gridSelectionsVar({
										...gridSelectionsVar(),
										selectedOrder: false,
									});
								})
							}>
							DELETE
						</button>
						<button
							onClick={() => {
								onClose();
							}}>
							CANCEL
						</button>
					</div>
				);
			},
		});
	};

	return (
		<Button
			fullWidth
			onClick={handleDeleteProjectHeader}
			color='delete'
			disabled={selectedProject === false}
			startIcon={<DeleteIcon />}>
			delete project header
		</Button>
	);
};

export default DeleteProjectHeader;

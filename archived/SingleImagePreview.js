/** @format */

import {ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import {useEffect} from 'react';

const SingleImagePreview = ({
	file,
	fileDataURL,
	setFileDataURL,
	getValues,
}) => {
	useEffect(() => {
		let fileReader,
			isCancel = false;
		if (file) {
			fileReader = new FileReader();
			fileReader.onload = (e) => {
				const { result } = e.target;
				if (result && !isCancel) {
					setFileDataURL(result);
				}
			};
			fileReader.readAsDataURL(file.data);
		}
		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [file]);

	return (
		<>
			<h1>Single Image Preview Box</h1>

			{fileDataURL ? (
				<ImageList cols={3}>
					<ImageListItem>
						<img
							src={fileDataURL}
							srcSet={fileDataURL}
							alt={'title'}
							loading='lazy'
						/>
						<ImageListItemBar
							title={file.title}
							subtitle={<span>Date Taken: {file.date}</span>}
							position='top'
						/>
					</ImageListItem>
				</ImageList>
			) : null}
		</>
	);
};
export default SingleImagePreview;

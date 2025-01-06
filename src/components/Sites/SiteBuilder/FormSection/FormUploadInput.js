import { Box, Button, InputLabel, Typography } from "@mui/material"
import React, { useState } from "react"
import styled from "styled-components";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FormUploadInput = ({
	type = "image",
	name,
	label,
	handleFormChange,
	startingValue = '',
	helperText = ''
}) => {
	const [value, setValue] = useState(startingValue || '')
	const [uploadError, setUploadError] = useState(null);

	const handleChange = (e) => {
		console.log(name, e.target.files[0])
		// Approx 2mb
		if(e.target.files[0].size > 2097152) {
			setUploadError('File Too Large');
			e.target.value = '';
			return;
		}
		setUploadError(null);
		setValue(e.target.files[0])
		handleFormChange({ [name]: e.target.files[0] })
	}
	return (
		<Box>
			<InputLabel>{label}</InputLabel>

			<Button
				component="label"
				role={undefined}
				variant="contained"
				tabIndex={-1}
				startIcon={<CloudUploadIcon />}
			>
				{value ? 'Change file' : 'Upload file'}
				<VisuallyHiddenInput
					type="file"
					onChange={handleChange}
				/>
			</Button>
			{helperText && <Typography color='text.default'>{helperText}</Typography>}
			{uploadError && <Typography color='secondary.main'>{uploadError}</Typography>}
		</Box>
	)
}

export default FormUploadInput
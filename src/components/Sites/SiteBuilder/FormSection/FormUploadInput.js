import { Button, FileField, InputLabel } from "@mui/material"
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

const FormUploadInput = ({ type = "image", name, label, setFormData, startingValue = '' }) => {
	const [value, setValue] = useState(startingValue || '')

	const handleChange = (e) => {
		setValue(e.target.files[0])
		setFormData(curr => ({ ...curr, [name]: e.target.files[0] }))
	}
	return (
		<Button
			component="label"
			role={undefined}
			variant="contained"
			tabIndex={-1}
			startIcon={<CloudUploadIcon />}
		>
			<InputLabel>{label}</InputLabel>
			{value ? 'Change file' : 'Upload file'}
			<VisuallyHiddenInput
				type="file"
				onChange={handleChange}
			/>
		</Button>
	)
}

export default FormUploadInput
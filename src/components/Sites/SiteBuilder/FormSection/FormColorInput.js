import React, { useEffect, useState } from "react"
import { Box, InputLabel, TextField, Typography } from "@mui/material"
import { HexColorPicker } from "react-colorful";

import './colorStyles.scss';

const FormColorInput = ({
	type = "text",
	name,
	label,
	handleFormChange,
	startingValue = '',
	helperText = ''
}) => {
	const [value, setValue] = useState(startingValue || '')

	useEffect(() => {
		handleFormChange({ [name]: value })
	}, [name, value, handleFormChange])
	return (
		<Box className="formColorInput" sx={{ width: 1 }}>
			<InputLabel sx={{ display: 'inline' }}>{label}</InputLabel>
			<HexColorPicker color={value} onChange={setValue} />
			{helperText && <Typography color='secondary.main'>{helperText}</Typography>}
		</Box>
	)
}

export default FormColorInput
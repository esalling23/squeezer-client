import React, { useState } from "react"
import { Box, TextField, Typography } from "@mui/material"

const FormTextInput = ({
	type = "text",
	name,
	label,
	handleFormChange,
	startingValue = '',
	helperText = ''
}) => {
	const [value, setValue] = useState(startingValue || '')

	const handleChange = (e) => {
		setValue(e.target.value)
		handleFormChange({ [name]: e.target.value })
	}
	return (
		<Box sx={{ width: 1 }}>
			<TextField
				type={type}
				name={name}
				label={label}
				value={value}
				onChange={handleChange}
        slotProps={{
          htmlInput: {
            className: 'browser-default',
          },
        }}
			/>
			{helperText && <Typography color='secondary.main'>{helperText}</Typography>}
		</Box>
	)
}

export default FormTextInput
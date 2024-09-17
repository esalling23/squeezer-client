import React, { useState } from "react"
import { TextField } from "@mui/material"

const FormTextInput = ({ type = "text", name, label, setFormData, startingValue = '' }) => {
	const [value, setValue] = useState(startingValue || '')

	const handleChange = (e) => {
		setValue(e.target.value)
		setFormData(curr => ({ ...curr, [name]: e.target.value }))
	}
	return (
		<TextField
			type={type}
			name={name}
			label={label}
			value={value}
			onChange={handleChange}
		/>
	)
}

export default FormTextInput
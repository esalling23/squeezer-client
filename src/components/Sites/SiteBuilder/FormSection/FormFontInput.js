import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import FormTextInput from "./FormTextInput"

// Future work:
// - include dropdown of reusable fonts
// - include backup font option that only uses reusable, browser-builtin fonts

const fontData = {
  family: '',
  url: ''
}

// Form input for handling font submission
const FormFontInput = ({
	name,
	label = 'Font Input',
	handleFormChange,
  startingValue
}) => {
	const [value, setValue] = useState(startingValue || fontData)

	const handleChange = (value) => {
		setValue(curr => ({ ...curr, ...value }))
	}

  useEffect(() => {
    handleFormChange({ [name]: value })
  }, [handleFormChange, name, value])

	return (
		<Box sx={{ width: 1 }}>
      <Typography 
        color="text.primary" 
        aria-label="Font Input Label"
        variant="h6"
        sx={{ mb: 1 }}
      >{label}</Typography>
			<FormTextInput 
        name="family"
        label="Font Family Name"
        helperText="Example: Garramond, Arial, etc."
        handleFormChange={handleChange}
      />
			<FormTextInput 
        name="url"
        label="Font Delivery URL"
        helperText="Obtain from a font CDN like Google Fonts"
        handleFormChange={handleChange}
      />
		</Box>
	)
}

export default FormFontInput
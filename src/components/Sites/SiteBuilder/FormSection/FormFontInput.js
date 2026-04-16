import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import FontInputToggle from "./FontInputToggle"

const fontData = {
  family: '',
  url: ''
}

const FormFontInput = ({
	name,
	label = 'Font Input',
	handleFormChange,
  startingValue
}) => {
	const [value, setValue] = useState(startingValue || fontData)

	const handleFontToggleChange = (result) => {
		setValue(curr => ({ ...curr, ...result }))
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
			<FontInputToggle
        label={label}
        value={value}
        onChange={handleFontToggleChange}
      />
		</Box>
	)
}

export default FormFontInput

import React, { useState, useRef } from "react"
import { Box, IconButton, Typography, Tooltip } from "@mui/material"
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import FontPickerDropdown from "./FontPickerDropdown"
import FormTextInput from "./FormTextInput"

const FontInputToggle = ({
  label,
  value = { family: '', url: '' },
  onChange,
}) => {
  const [mode, setMode] = useState('picker') // 'picker' | 'text'
  const [pickerAvailable, setPickerAvailable] = useState(true)
  const [warning, setWarning] = useState('')

  // Track the last URL set by the picker so we can detect manual edits
  const lastPickerUrl = useRef(value.url)

  const handlePickerChange = (result) => {
    if (!result) {
      onChange({ family: '', url: '' })
      lastPickerUrl.current = ''
      setWarning('')
      return
    }
    onChange(result)
    lastPickerUrl.current = result.url
    setWarning('')
  }

  const handleTextChange = (data) => {
    onChange({ ...value, ...data })
  }

  const handleToggle = () => {
    if (mode === 'picker') {
      setMode('text')
      setWarning('')
    } else {
      if (value.url && value.url !== lastPickerUrl.current) {
        setWarning(`Warning: choosing from the list overrides existing value of "${value.url}"`)
      } else {
        setWarning('')
      }
      setMode('picker')
    }
  }

  const handlePickerError = () => {
    setPickerAvailable(false)
    setMode('text')
  }

  // Extract family name from current URL for the picker's selected state
  const familyFromUrl = value.url
    ? decodeURIComponent(
        (value.url.match(/family=([^&]+)/) || [])[1] || ''
      ).replace(/\+/g, ' ')
    : null

  return (
    <Box sx={{ width: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        {pickerAvailable && (
          <Tooltip title={mode === 'picker' ? 'Switch to manual input' : 'Switch to font picker'}>
            <IconButton size="small" onClick={handleToggle}>
              <SwapHorizIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {warning && (
        <Typography color="warning.main" variant="caption" sx={{ display: 'block', mb: 1 }}>
          {warning}
        </Typography>
      )}

      {mode === 'picker' && pickerAvailable ? (
        <FontPickerDropdown
          value={familyFromUrl}
          onChange={handlePickerChange}
          label={label}
          onError={handlePickerError}
        />
      ) : (
        <>
          <FormTextInput
            name="family"
            label="Font Family Name"
            startingValue={value.family}
            handleFormChange={handleTextChange}
            helperText='Example: Garamond, Arial, etc.'
          />
          <FormTextInput
            name="url"
            label="Font Delivery URL"
            startingValue={value.url}
            handleFormChange={handleTextChange}
            helperText='Obtain from a font CDN like Google Fonts'
          />
        </>
      )}
    </Box>
  )
}

export default FontInputToggle

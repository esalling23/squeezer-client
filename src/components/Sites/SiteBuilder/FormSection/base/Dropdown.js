import React from "react"
import { Autocomplete, TextField, CircularProgress } from "@mui/material"

const Dropdown = ({
  options = [],
  value = null,
  onChange,
  label = '',
  placeholder = '',
  groupBy,
  disabled = false,
  loading = false,
  getOptionLabel,
  renderOption,
}) => {
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(e, newValue) => onChange(newValue)}
      getOptionLabel={getOptionLabel || ((option) => option.label || '')}
      groupBy={groupBy}
      disabled={disabled}
      loading={loading}
      isOptionEqualToValue={(option, val) => option.value === val?.value}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          slotProps={{
            input: {
              ...params.InputProps,
              className: 'browser-default',
              endAdornment: (
                <>
                  {loading && <CircularProgress size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  )
}

export default Dropdown

import React from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const LinkButton = ({
  to,
  onClick,
  ...rest
}) => {
	const navigate = useNavigate()
  return (
    <Button
      {...rest}
      onClick={(event) => {
        onClick && onClick(event)
        navigate(to)
      }}
    />
  )
}

export default LinkButton

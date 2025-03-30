import React from 'react'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'

const LinkButton = ({
  to,
  onClick,
  sx = {},
  isExternal, 
  component: Component = Button,
  ...rest
}, ref) => {
	const navigate = useNavigate()
  return (
    <Component
      ref={ref}
      {...rest}
      sx={{
        m: 1,
        ...sx
      }}
      onClick={(event) => {
        if (onClick) return onClick(event)
        
        if (isExternal) {
          window.open(to, '_blank', 'rel=noopener noreferrer')
        } else {
          navigate(to)
        }
      }}
    />
  )
}

export default React.forwardRef(LinkButton)

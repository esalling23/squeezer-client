import React from 'react'
import { Link as RLink } from 'react-router-dom'
import Link from '@mui/material/Link'

const RouterLink = ({
  to,
	children,
  sx = {},
  ...rest
}) => {
  return (
    <Link
      component={RLink}
      to={to}
      underline="hover"
      sx={{ mx: 2, ...sx }}
      {...rest}
    >
      {children}
    </Link>
  )
}

export default RouterLink

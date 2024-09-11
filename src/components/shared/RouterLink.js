import React from 'react'
import { Link as RLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const RouterLink = ({
  to,
	children,
  ...rest
}) => {
  return (
    <Typography
			sx={{ mx: 2 }}
		>
			<Link
				component={RLink}
				to={to}
				underline="hover"
				{...rest}
			>
				{children}
			</Link>
		</Typography>
  )
}

export default RouterLink

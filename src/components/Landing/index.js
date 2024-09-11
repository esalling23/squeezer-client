import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

const Landing = () => {

	return (
		<Container>
			<Typography variant="h1" component="h2">
				Squeezer: The No-Code Landing Page Solution
			</Typography>

			<Button variant="contained">Book a Demo</Button>
			<Button variant="contained">Start Free Trial</Button>
		</Container>
	)
}

export default Landing
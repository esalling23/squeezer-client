import React from 'react'
import Typography from '@mui/material/Typography'
import { Button, Grid2 } from '@mui/material'
import { Container } from '@mui/material'

const Landing = () => {
	return (
		<>
			<Typography variant="h2" component="h1" sx={{ fontWeight: 800, my: 10 }} textAlign="center">
				Promote yourself and generate leads with beautiful, no-code squeeze pages
			</Typography>
			<Container maxWidth="md" sx={{ my: 5 }}>
				<Typography variant="h4" component="h2" textAlign="center" lineHeight={'150%'}>
					Capture leads effortlessly with custom forms and high-converting landing pages
				</Typography>
			</Container>

			<Container maxWidth="md">
				<Grid2 container spacing={2}>
					<Grid2 item size={{ xs: 12, md: 6 }} sx={{ mt: 2 }}>
						<Button sx={{ width: 1, height: 60 }} variant="outlined">Book a Demo</Button>
					</Grid2>
					<Grid2 item size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
						<Button sx={{ width: 1, height: 60 }} variant="contained">Start Free Trial</Button>
					</Grid2>
				</Grid2>
			</Container>
		</>
	)
}

export default Landing
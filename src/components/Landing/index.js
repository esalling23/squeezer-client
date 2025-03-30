import React from 'react'
import Typography from '@mui/material/Typography'
import { Button, Grid2 } from '@mui/material'
import { Container } from '@mui/material'
import LinkButton from '../shared/LinkButton'
import { signIn } from '../../api/auth'
import { useUserContext } from '../../context/UserContext'
import { useAppContext } from '../../context/AppContext'
import { signInFailure, signInSuccess } from '../AutoDismissAlert/messages'
import { useNavigate } from 'react-router'

const Landing = () => {
  const { addAlert } = useAppContext();
  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleDemoLogin = (event) => {
    event.preventDefault()

    signIn({
      email: 'admin@example.com',
      password: 'test'
    })
      .then((res) => login(res.data.user))
      .then(() =>
        addAlert({
          heading: 'Success! Check out app features with this demo account.',
          message: signInSuccess,
          severity: 'success'
        })
      )
      .then(() => navigate('/sites'))
      .catch((error) => {
        addAlert({
          heading: 'Could not complete demo login. Error: ' + error.message,
          message: signInFailure,
          severity: 'error'
        })
      })
  }
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
						<Button 
              sx={{ width: 1, height: 60 }} 
              variant="contained"
              onClick={handleDemoLogin}
            >Demo</Button>
					</Grid2>
					<Grid2 item size={{ xs: 12, md: 6 }} sx={{ mt: 2 }}>
						<LinkButton 
              sx={{ width: 1, my: 0, height: 60, fontWeight: 800 }} 
              variant="outlined"
              to={'/sign-up'}
            >Create an Account</LinkButton>
					</Grid2>
				</Grid2>
			</Container>
		</>
	)
}

export default Landing
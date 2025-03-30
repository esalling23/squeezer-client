import React from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import { signUpSuccess, signUpFailure } from '../AutoDismissAlert/messages'

import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button'
import { Box, Grid2 as Grid } from '@mui/material';
import useFormData from '../../hooks/useFormData';
import { useAppContext } from '../../context/AppContext';
import { useUserContext } from '../../context/UserContext';
import RouterLink from '../shared/RouterLink';

const groupStyles = {
  my: 1
}

const SignUp = () => {
	const { addAlert } = useAppContext();
	const { login } = useUserContext();

  const [data, handleChange, resetData] = useFormData({
		email: '',
		password: '',
		passwordConfirmation: ''
	})
	const navigate = useNavigate();

	const onSignUp = (event) => {
		event.preventDefault()
		signUp(data)
			.then(() => signIn(data))
			.then((res) => login(res.data.user))
			.then(() =>
				addAlert({
					heading: 'Sign Up Success',
					message: signUpSuccess,
					severity: 'success'
				})
			)
			.then(() => navigate('/sites'))
			.catch((error) => {
				resetData()
				addAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: signUpFailure,
					severity: 'error'
				})
			})
	}

  return (
    <Grid size={{ xs: 12, sm: 8, md: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h3>Sign Up</h3>
        <form onSubmit={onSignUp} style={{ width: '100%'}}>
          <FormGroup sx={groupStyles}>
            <InputLabel>Email address</InputLabel>
            <TextField
              required
              type='email'
              name='email'
              value={data.email}
              placeholder='Enter email'
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup sx={groupStyles}>
            <InputLabel>Password</InputLabel>
            <TextField
              required
              name='password'
              value={data.password}
              type='password'
              placeholder='Password'
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup sx={groupStyles}>
            <InputLabel>Password Confirmation</InputLabel>
            <TextField
              required
              name='passwordConfirmation'
              value={data.passwordConfirmation}
              type='password'
              placeholder='Confirm Password'
              onChange={handleChange}
            />
          </FormGroup>
          <Button sx={groupStyles} variant='contained' type='submit'>Submit</Button>
        </form>
      </Box>
			<RouterLink 
        to="/sign-in"
        sx={{
          mx: 0,
          my: 2,
          display: 'block',
          width: '100%',
          textAlign: 'center'
        }}
      >Have an account? Sign in now</RouterLink>

    </Grid>
  )

}

export default SignUp

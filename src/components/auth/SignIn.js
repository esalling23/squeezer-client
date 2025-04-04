import React from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import { signInSuccess, signInFailure } from '../AutoDismissAlert/messages'

import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2';
import useFormData from '../../hooks/useFormData';
import { useAppContext } from '../../context/AppContext';
import { useUserContext } from '../../context/UserContext';
import { Box } from '@mui/material';
import RouterLink from '../shared/RouterLink';

const groupStyles = {
  my: 1
}

const SignIn = () => {
	const { addAlert } = useAppContext();
	const { login } = useUserContext();

	const [data, handleChange, resetData] = useFormData({
		email: '',
		password: ''
	})
  const navigate = useNavigate();

	const onSignIn = (event) => {
		event.preventDefault()
		console.log(data);

		signIn(data)
			.then((res) => login(res.data.user))
			.then(() =>
				addAlert({
					heading: 'Sign In Success',
					message: signInSuccess,
					severity: 'success'
				})
			)
			.then(() => navigate('/sites'))
			.catch((error) => {
				resetData();
				addAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: signInFailure,
					severity: 'error'
				})
			})
	}

  return (
    <Grid size={{ xs: 12, sm: 8, md: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h3>Sign In</h3>
        <form onSubmit={onSignIn} style={{width: '100%'}}>
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
          <Button sx={groupStyles} variant='contained' type='submit'>Submit</Button>
        </form>
      </Box>
			<RouterLink 
        sx={{
          mx: 0,
          my: 2,
          display: 'block',
          width: '100%',
          textAlign: 'center'
        }}
        to="/sign-up"
      >New? Create an account here</RouterLink>
    </Grid>
  )
}

export default SignIn

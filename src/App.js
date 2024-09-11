import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '@mui/material/styles';

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import AutoDismissAlert from './components/AutoDismissAlert'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import Account from './components/auth/Account'
import SiteList from './components/Sites/SiteList'

import SiteForm from './components/Sites/SiteForm';
import MenuAppBar from './components/AppBar'
import Home from './components/Landing';
import pages from './lib/pages';
import theme from './theme';
import SitesContainer from './components/Sites';
import { useAppContext } from './context/AppContext';
import { useUserContext } from './context/UserContext';
import Grid from '@mui/material/Grid2';

const App = () => {
  const { alerts } = useAppContext();
	const { isAuthenticated } = useUserContext();

	const msgAlertPopups = alerts.map((msgAlert) => (
		<AutoDismissAlert
			key={msgAlert.id}
			id={msgAlert.id}
			heading={msgAlert.heading}
			variant={msgAlert.variant}
			severity={msgAlert.severity}
			message={msgAlert.message}
		/>
	));

  return (
		<ThemeProvider theme={theme}>
			<Box>
				<MenuAppBar />

				<AnimatePresence>
					{msgAlertPopups}
				</AnimatePresence>

				<Container maxWidth="lg">
					<Grid container sx={{ width: '100%' }} display="flex" justifyContent="center" alignItems="center" size="grow">
						<Routes>
							<Route
								path='/'
								element={(
									<Home />
								)}
							/>
							<Route
								path='/sign-up'
								element={(
									<SignUp />
								)}
							/>
							<Route
								path='/sign-in'
								element={(
									<SignIn />
								)}
							/>
							{pages.map(({ title, element: Component, path }) => (
								<Route 
									key={title}
									element={<Component />} 
									path={path} 
								/>
							))}
							{isAuthenticated && (
								<>
									<Route
										path='/sign-out'
										element={(
											<SignOut />
										)}
									/>
									<Route
										path='/account'
										element={(
											<Account />
										)}
									/>
									<Route
										path='/sites'
										element={(
											<SitesContainer />
										)}
									>
										<Route
											path='/sites'
											exact
											element={(
												<SiteList />
											)}
										/>
										<Route
											path='/sites/:id'
											exact
											element={(
												<SiteForm />
											)}
										/>
									</Route>
								</>
							)}
							
						</Routes>
					</Grid>
				</Container>
				
			</Box>

		</ThemeProvider>
  );
};

export default App;

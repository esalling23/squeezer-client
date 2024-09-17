import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
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

import MenuAppBar from './components/AppBar'
import Home from './components/Landing';
import contentPages from './lib/pages';
import theme from './theme';
import SitesContainer from './components/Sites';
import { useAppContext } from './context/AppContext';
import { useUserContext } from './context/UserContext';
import Grid from '@mui/material/Grid2';
import SiteBuilder from './components/Sites/SiteBuilder';
import { Fade } from '@mui/material';

const App = () => {
  const { alerts } = useAppContext();
	const { loading, isAuthenticated } = useUserContext();
	const location = useLocation();

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
	const contentPageRoutes = contentPages.map(({ title, element: Component, path }) => (
		<Route 
			key={title}
			element={<Component />} path={path} 
		/>
	));
	const authenticatedRoutes = (
		<>
			<Route path='/sign-out' element={<SignOut />} />
			<Route path='/account' element={<Account />} />
			<Route path='/sites' element={<SitesContainer />}>
				<Route path='/sites' exact element={<SiteList />} />
				<Route path='/sites/create' exact element={<SiteBuilder isNew />} />
				<Route path='/sites/:id' exact element={<SiteBuilder />} />
			</Route>
		</>
	);
	const preloginRoutes = (
		<>
			<Route path='/sign-up' element={<SignUp />} />
			<Route path='/sign-in' element={<SignIn />} />
		</>
	);

  return (
		<ThemeProvider theme={theme}>
			<Fade in={!loading}>
				<Box>
					<MenuAppBar />

					<AnimatePresence>
						{msgAlertPopups}
					</AnimatePresence>

					<Container maxWidth="xl" sx={{ p: 0, mb: 8 }}>
						<Grid container sx={{ width: '100%' }} justifyContent="center" alignItems="center">
							<Routes>
								<Route path='/' element={<Home />} />
								{contentPageRoutes}
								{isAuthenticated ? authenticatedRoutes : preloginRoutes}
							</Routes>
						</Grid>
					</Container>
				</Box>
			</Fade>
		</ThemeProvider>
  );
};

export default App;

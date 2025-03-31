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
import { CssBaseline, Fade } from '@mui/material';
import AuthenticatedRoute from './components/shared/AuthenticatedRoute';
import LeadsView from './components/Sites/LeadsView';

const App = () => {
  const { alerts } = useAppContext();
	const { loading } = useUserContext();

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
			<Route path='/sign-out' element={
				<AuthenticatedRoute><SignOut /></AuthenticatedRoute>
			} />
			<Route path='/account' element={
				<AuthenticatedRoute><Account /></AuthenticatedRoute>
			} />
			<Route path='/sites' element={
				<AuthenticatedRoute><SitesContainer /></AuthenticatedRoute>
			}>
				<Route path='/sites' exact element={
					<AuthenticatedRoute><SiteList /></AuthenticatedRoute>
				} />
				<Route path='/sites/:id' exact element={
					<AuthenticatedRoute><SiteBuilder /></AuthenticatedRoute>
				} />
				<Route path='/sites/:id/leads' exact element={
					<AuthenticatedRoute><LeadsView /></AuthenticatedRoute>
				} />
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
			<CssBaseline />
			<Fade in={!loading}>
				<Box>
					<MenuAppBar />

					<AnimatePresence>
						{msgAlertPopups}
					</AnimatePresence>

					<Container maxWidth="xl" sx={{ p: 1, mb: 8, '&.MuiContainer-root': { p: 0 } }}>
						<Grid container sx={{ width: '100%' }} justifyContent="center" alignItems="center">
							<Routes>
								<Route path='/' element={<Home />} />
								{contentPageRoutes}
								{authenticatedRoutes}
								{preloginRoutes}
							</Routes>
						</Grid>
					</Container>
				</Box>
			</Fade>
		</ThemeProvider>
  );
};

export default App;

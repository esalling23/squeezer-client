import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom'
import Box from '@mui/material/Box';

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import LinkButton from '../shared/LinkButton';
import Grid from '@mui/material/Grid2';
import { Container, TextField, Toolbar } from '@mui/material';
import { useUserContext } from '../../context/UserContext';

const SitesContainer = () => {
	const { getSite } = useUserContext();
	const { id } = useParams();
	const site = useMemo(() => getSite(id), [id, getSite])

	return (
		<Box sx={{ width: '100%' }}>
			<AppBar position="sticky">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box sx={{ flexGrow: 1 }}>
							<Typography>Sites {site?.pageTitle ? ` / ${site.pageTitle}` : ''}</Typography>
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<LinkButton to="/sites/create">Create New Site</LinkButton>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			<Grid container sx={{ width: '100%' }}>
				<Outlet />
			</Grid>
		</Box>
	)
}

export default SitesContainer
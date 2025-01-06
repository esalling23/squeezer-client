import React, { useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom'
import Box from '@mui/material/Box';

import { useUserContext } from '../../context/UserContext';
import SiteAppBar from './SiteAppBar';

const SitesContainer = () => {
	const { getSite } = useUserContext();
	const { id } = useParams();
	const site = useMemo(() => getSite(id), [id, getSite])

	return (
		<Box sx={{
			width: 1, 
			height: 'calc(100vh - 70px)', 
			position: 'relative',
			display: 'flex',
			flexDirection: 'column'
		}}>
			<SiteAppBar site={site} />
			<Box sx={{ width: 1, flexGrow: 1 }}>
				<Outlet />
			</Box>
		</Box>
	)
}

export default SitesContainer
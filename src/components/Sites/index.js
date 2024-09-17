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
		<Box sx={{width: '100%', position: 'relative'}}>
			<SiteAppBar site={site} />
			<Outlet />
		</Box>
	)
}

export default SitesContainer
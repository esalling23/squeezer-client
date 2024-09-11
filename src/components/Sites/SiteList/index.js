import React from 'react';
import { useOutletContext } from 'react-router-dom'

import Stack from '@mui/material/Stack'
import RouterLink from '../../shared/RouterLink';
import { useUserContext } from '../../../context/UserContext';
import { LinearProgress } from '@mui/material';

const SiteList =  () => {
	const { sites, loading } = useUserContext();

	if (loading) {
		return <LinearProgress />
	}

	const listItems = sites?.map(site => (
		<li key={site.id}>
			<img src={site.heroImage} height="100" width="100" alt="hero" /> 
			<RouterLink to={`/sites/${site.id}`}>
				{site.pageTitle}
			</RouterLink>
		</li>
	))

	return (
		<Stack>
			{listItems}
		</Stack>
	);
}

export default SiteList;
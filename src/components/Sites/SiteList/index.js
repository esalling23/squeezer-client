import React from 'react';

import Stack from '@mui/material/Stack'
import RouterLink from '../../shared/RouterLink';
import { useUserContext } from '../../../context/UserContext';
import { Box, LinearProgress, ListItem } from '@mui/material';

import WebIcon from '@mui/icons-material/Web';

const SiteList =  () => {
	const { sites, loading } = useUserContext();

	if (loading) {
		return <LinearProgress />
	}

	const listItems = sites?.map(site => (
		<ListItem key={site.id}>
			<RouterLink to={`/sites/${site.id}`} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {site.heroImage ? (
          <img src={site.heroImage} height="100" width="100" alt="hero" /> 
        ) : <Box
          sx={{
            width: 100,
            height: 100,
            // backgroundColor: site.backgroundColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <WebIcon fontSize="large"/>
        </Box>}
				{site.pageTitle}
			</RouterLink>
		</ListItem>
	))

	return (
		<Stack>
			{listItems?.length > 0 ? listItems : 'No sites...yet!'}
		</Stack>
	);
}

export default SiteList;
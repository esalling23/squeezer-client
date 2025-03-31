import React from 'react';

import Stack from '@mui/material/Stack'
import RouterLink from '../../shared/RouterLink';
import { useUserContext } from '../../../context/UserContext';
import { Box, LinearProgress, ListItem, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import WebIcon from '@mui/icons-material/Web';
import SiteActionsGroup, { SITE_ACTIONS } from '../SiteActions/SiteActionsGroup';

const SiteList =  () => {
	const { sites, loading } = useUserContext();

	if (loading) {
		return <LinearProgress />
	}

	const listItems = sites?.map(site => (
    <>
      <ListItem 
        key={site.id} 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backdropFilter: 'brightness(90%)',
          '&:hover': {
            backdropFilter: 'brightness(95%)'
          }
        }}
      >
        <RouterLink 
          to={`/sites/${site.id}`} 
          sx={{ m: 0, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start' }}
        >
          {site.heroImage ? (
            <img 
              src={site.heroImage} 
              height="80" 
              width="80" 
              alt="hero" 
              sx={{ minWidth: 80 }}
            /> 
          ) : <Box
            sx={{
              width: 80,
              height: 80,
              minWidth: 80,
              // backgroundColor: site.backgroundColor,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <WebIcon fontSize="large"/>
          </Box>}
          <Typography
            variant="h5"
            sx={{ ml: 1, minWidth: 0, flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          >
            {site.subdomain}
          </Typography>
        </RouterLink>

        <SiteActionsGroup
          site={site}
          actions={[
            SITE_ACTIONS.LEADS,
            SITE_ACTIONS.LIVE
          ]}
        />
      </ListItem>
      <Divider variant='middle' key={`divider-${site.id}`}/>
    </>
	))

	return (
    <>
      <Stack>
        {listItems?.length > 0 ? listItems : <Typography 
          variant="h5" 
          sx={{ textAlign: 'center', py: 3 }}
        >No sites...yet!</Typography>}
      </Stack>
    </>
	);
}

export default SiteList;
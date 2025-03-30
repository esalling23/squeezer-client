import React from 'react';

import Stack from '@mui/material/Stack'
import RouterLink from '../../shared/RouterLink';
import { useUserContext } from '../../../context/UserContext';
import { Box, LinearProgress, ListItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import WebIcon from '@mui/icons-material/Web';
import SiteActionsGroup, { SITE_ACTIONS } from '../SiteActions/SiteActionsGroup';

const SiteList =  () => {
	const { sites, loading } = useUserContext();
  const theme = useTheme()
  console.log({ theme })

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
          // backgroundColor: `${theme.palette.primary.main}`,
          backdropFilter: 'brightness(90%)',
          '&:hover': {
            backdropFilter: 'brightness(95%)'
          }
        }}
      >
        <RouterLink 
          to={`/sites/${site.id}`} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: 1 }}>
          {site.heroImage ? (
            <img src={site.heroImage} height="100" width="100" alt="hero" /> 
          ) : <Box
            sx={{
              width: 100,
              height: 100,
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
            sx={{ ml: 3 }}
          >
            {site.pageTitle}
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
import React, { useState } from 'react';

import Stack from '@mui/material/Stack'
import RouterLink from '../../shared/RouterLink';
import { useUserContext } from '../../../context/UserContext';
import { Box, Button, LinearProgress, ListItem, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

import WebIcon from '@mui/icons-material/Web';
import ConfirmDeleteSiteModal from '../ConfirmDeleteSiteModal';

const SiteList =  () => {
	const { sites, loading, refreshData } = useUserContext();

  const [deleteSiteId, setDeleteSiteId] = useState(null);

  const handleDeleteClick = id => () => {
    setDeleteSiteId(id)
  }

	if (loading) {
		return <LinearProgress />
	}

	const listItems = sites?.map(site => (
    <>
      <ListItem key={site.id} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
        <Button 
          variant="contained" 
          color="error"
          onClick={handleDeleteClick(site.id)}
          sx={{ width: 50, }}
        >
          Delete
        </Button>
      </ListItem>
      <Divider variant='middle'/>
    </>
	))

  const handleClose = () => {
    setDeleteSiteId(null)
    refreshData()
  }

	return (
    <>
      <ConfirmDeleteSiteModal
        siteId={deleteSiteId}
        handleClose={handleClose}
      />
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
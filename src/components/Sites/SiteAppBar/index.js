import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router";

import { AppBar as mAppBar, Box, Container, Toolbar, Breadcrumbs } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import WebIcon from '@mui/icons-material/Web';

import RouterLink from "../../shared/RouterLink";
import SiteActionsGroup, { SITE_ACTIONS } from "../SiteActions/SiteActionsGroup";
import ConfirmDeleteSiteModal from "../ConfirmDeleteSiteModal";
import SiteActionsMenu from "../SiteActions/SiteActionsGroup/SiteActionsMenu";

const AppBar = styled(mAppBar)(({ theme }) => ({
  boxShadow: 'none',
	borderBottom: `1px solid ${theme.divider}`,
	zIndex: 1,
	bgcolor: 'white', 
	'&.MuiPaper-root': {
		boxShadow: 'none'
	}
}));

const SiteAppBar = ({
	site,
}) => {
	const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [deleteSiteId, setDeleteSiteId] = useState(null);

	const siteActions = useMemo(() => {
		if (!id) {
			return [SITE_ACTIONS.CREATE]
		}
    if (location.pathname.includes('/leads')) {
      return [
        SITE_ACTIONS.LIVE
      ]
    }
    
		return Object.values(SITE_ACTIONS)
	}, [id, location])

  const handleDeleteClick = id => () => {
    setDeleteSiteId(id)
  }
  
  const handleCloseDeleteConfirmMenu = () => {
    setDeleteSiteId(null)
    navigate('/sites')
  }

	return (
    <>
      <AppBar position="sticky" sx={{ zIndex: 1300 }}>
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters
          >
            <Breadcrumbs 
              sx={{ minHeight: '56px', flexGrow: 1, display: 'flex', backgroundColor: 'inherit', boxShadow: 'none' }}
              aria-label="breadcrumbs"
            >
              <RouterLink
                onClick={(e) => {
                  e.preventDefault()
                  navigate(-1)
                }}
                sx={{ 
                  opacity: id ? 1 : 0, 
                  pointerEvents: id ? 'auto' : 'none' 
                }}
              >
                <ArrowBackIcon />
              </RouterLink>
              <RouterLink
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                to="/sites"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Sites
              </RouterLink>
              {site?.pageTitle && <RouterLink
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                to={`/sites/${site.id}`}
              >
                <WebIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                {site.pageTitle}
              </RouterLink>}

              {location.pathname.includes('/leads') && <RouterLink
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                to={`/sites/${site.id}/leads`}
              >
                <ContactsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Leads
              </RouterLink>}
            </Breadcrumbs>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'end' }}>
              <SiteActionsGroup 
                site={site}
                handleDelete={handleDeleteClick}
                actions={siteActions}
              />
            </Box>

            <SiteActionsMenu 
              site={site}
              handleDelete={handleDeleteClick}
              actions={siteActions}
            />
          </Toolbar>
        </Container>
      </AppBar>

      <ConfirmDeleteSiteModal
        siteId={deleteSiteId}
        handleClose={handleCloseDeleteConfirmMenu}
      />
    </>
	)
}

export default SiteAppBar
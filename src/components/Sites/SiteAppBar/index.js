import React, { useMemo } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router";

import { AppBar as mAppBar, Box, Container, Toolbar, Breadcrumbs } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import WebIcon from '@mui/icons-material/Web';

import RouterLink from "../../shared/RouterLink";
import CreateSiteButton from "../SiteActions/CreateSiteButton";
import LinkButton from "../../shared/LinkButton";

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

	const siteActions = useMemo(() => {
		if (!id) {
			return (
				<CreateSiteButton />
			)
		}
    if (location.pathname.includes('/leads')) {
      return <></>
    }
		return <LinkButton 
      variant="contained"
      to={`/sites/${id}/leads`}
      size="large"
    >Leads</LinkButton>
	}, [id, location])

	return (
		<AppBar position="sticky">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
          <Breadcrumbs 
            sx={{ flexGrow: 1, display: 'flex', backgroundColor: 'inherit', boxShadow: 'none' }}
            aria-label="breadcrumbs"
          >
						<RouterLink
							to="/sites"
							sx={{ opacity: id ? 1 : 0, pointerEvents: id ? 'auto' : 'none' }}
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
					<Box>
						{/* Middle buttons? */}
					</Box>
					<Box>
						{siteActions}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default SiteAppBar
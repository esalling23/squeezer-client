import React, { useMemo } from "react";
import styled from "styled-components";
import { useParams } from "react-router";

import { AppBar as mAppBar, Box, Container, Toolbar, Typography, Button } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import RouterLink from "../../shared/RouterLink";
import CreateSiteButton from "../SiteActions/CreateSiteButton";

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
	const siteActions = useMemo(() => {
		if (!id) {
			return (
				<CreateSiteButton />
			)
		}
		return <RouterLink to={`/sites/${id}/leads`}>View Leads</RouterLink>
	}, [id])
	return (
		<AppBar position="sticky">
			<Container>
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
						<RouterLink
							to="/sites"
							sx={{ opacity: id ? 1 : 0, pointerEvents: id ? 'auto' : 'none' }}
						>
							<ArrowBackIcon />
						</RouterLink>
						<Typography>Sites {site?.pageTitle ? ` / ${site.pageTitle}` : ''}</Typography>
					</Box>
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
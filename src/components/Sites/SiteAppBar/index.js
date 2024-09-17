import React, { useMemo } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router";

import { AppBar as mAppBar, Box, Container, Toolbar, Typography, Button } from "@mui/material"
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import LinkButton from "../../shared/LinkButton"
import RouterLink from "../../shared/RouterLink";

const AppBar = styled(mAppBar)(({ theme }) => ({
  boxShadow: 'none',
	borderBottom: `1px solid ${theme.divider}`,
	zIndex: 1
}));

const SiteAppBar = ({
	site,
	handleSave
}) => {
	const { id } = useParams();
	const siteActions = useMemo(() => {
		if (!id) {
			return (
				<RouterLink to={`/sites/create`}>
					<PostAddIcon />
					New Site
				</RouterLink>
			)
		}
		return (
			<Button onClick={handleSave}>save</Button>
		)
	}, [id])
	return (
		<AppBar position="sticky">
			<Container fixed>
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1 }}>
						<RouterLink
							to="/sites"
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
import * as React from 'react';
import mAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import pages from '../../lib/pages';
import AccountMenu from './AccountMenu';
import ActionButtons from './ActionButtons';
import RouterLink from '../shared/RouterLink';
import { useUserContext } from '../../context/UserContext';
import { Slide, styled, useMediaQuery } from '@mui/material';
import CreateSiteButton from '../Sites/SiteActions/CreateSiteButton';

const AppBar = styled(mAppBar)(({ theme }) => ({
  boxShadow: 'none',
	borderBottom: `1px solid ${theme.palette.divider}`,
	zIndex: 1
}));

const MobileMenu = styled(Box)(({ theme }) => ({
	zIndex: 0,
	position: 'fixed',
	bottom: 0,
	left: 0,
	height: 'calc(100vh - 48px)',
	width: '100vw',
	maxWidth: '100vw',
	overflow: 'scroll',
	background: theme.palette.background.default,
}))

const LogoText = styled(Typography)(({ theme }) => ({
	mr: 2,
	flexGrow: 1,
	fontFamily: 'monospace',
	fontWeight: 700,
	color: 'inherit',
	textDecoration: 'none',
}))

const ResponsiveAppBar = () => {
	const { isAuthenticated } = useUserContext();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

	const md = useMediaQuery('md');

	const smMenuAnchorRef = React.useRef(null);

  const handleToggleNavMenu = (event) => {
    setMobileMenuOpen(curr => !curr);
  };

	React.useEffect(() => {
		if (md) setMobileMenuOpen(false);
	}, [md]);

  return (
		<>
			<AppBar position="sticky" ref={smMenuAnchorRef}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<AdbIcon sx={{ mr: 1 }} />
						<LogoText
							variant="h6"
							noWrap
							component="a"
							href="/#/"
						>
							Squeeze Page
						</LogoText>

						{isAuthenticated ? (<>
              <CreateSiteButton sx={{ mr: 2 }}/>
							<AccountMenu />
						</>) : <>
							<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} justifyContent="end">
								<IconButton
									size="large"
									aria-label="menu options"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleToggleNavMenu}
									color="inherit"
								>
									<MenuIcon />
								</IconButton>
							</Box>
							<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
								{pages.map(({ title, path }) => (
									<RouterLink
										key={title}
										to={path}
										onClick={handleToggleNavMenu}
									>
										{title}
									</RouterLink>
								))}
							</Box>
							<ActionButtons />
						</>}
					</Toolbar>
				</Container>
			</AppBar>
	
			<Slide sx={{ display: { xs: 'block', md: 'none' } }} direction="down" in={mobileMenuOpen} mountOnEnter unmountOnExit>
				<MobileMenu
					id="menu-appbar"
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					mobileMenuOpen={mobileMenuOpen}
				>
					{pages.map(({ title, path }) => (
						<MenuItem key={title} onClick={handleToggleNavMenu}>
							<RouterLink 
								sx={{ textAlign: 'center' }} 
								to={path}
							>{title}</RouterLink>
						</MenuItem>
					))}
				</MobileMenu>
			</Slide>
		</>
  );
}
export default ResponsiveAppBar;
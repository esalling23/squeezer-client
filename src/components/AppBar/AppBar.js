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
	flexGrow: 0,
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
					<Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              <AdbIcon sx={{ mr: 1 }} />
              <LogoText
                variant="h6"
                noWrap
                component="a"
                href="/#/"
                style={{ width: 'fit-content'}}
              >
                Squeeze Page
              </LogoText>
            </Box>

						{isAuthenticated ? (<>
              <CreateSiteButton sx={{ mr: 2 }}/>
							<AccountMenu />
						</>) : <>
							<ActionButtons />
						</>}
					</Toolbar>
				</Container>
			</AppBar>
		</>
  );
}
export default ResponsiveAppBar;
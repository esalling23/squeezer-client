import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Account from '../auth/Account';
import SiteList from '../Sites/SiteList';
import SignOut from '../auth/SignOut';
import RouterLink from '../shared/RouterLink';
import { useUserContext } from '../../context/UserContext';

const settings = [
	{title: 'Account', path: "/account", component: Account },
	{title: 'Sites', path: "/sites", component: SiteList },
	{title: 'Logout', path: "/sign-out", component: SignOut },
];

function AccountMenu() {
	const { user } = useUserContext();
	
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
	return ( 
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title="Open settings">
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt={user.email} src="/static/images/avatar/2.jpg" />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: '45px' }}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				{settings.map(({ title, path, component: Component }) => (
					<MenuItem key={title} onClick={handleCloseUserMenu}>
						<RouterLink to={path} element={<Component />}>{title}</RouterLink>
					</MenuItem>
				))}
			</Menu>
		</Box>
	 );
}

export default AccountMenu;
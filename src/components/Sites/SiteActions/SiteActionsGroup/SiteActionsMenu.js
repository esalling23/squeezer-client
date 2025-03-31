import React, { useMemo, useState } from 'react'

import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import LinkButton from '../../../shared/LinkButton'
import getLiveUrl from '../../../../lib/getLiveUrl'

export const SITE_ACTIONS = {
  // CREATE: 'create',
  DELETE: 'delete',
  LIVE: 'live',
  LEADS: 'leads'
}

const menuStyles = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%'
}

const itemStyles = { 
  pr: 1,
  minWidth: 40
}

const SiteActionsMenu = ({
  actions = [], // array of SITE_ACTIONS
  allActions = false,
  site,
  handleDelete = () => {},
}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  const handleCloseActionsMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenActionsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const actionList = useMemo(() => {
    if (!site) return []

    const displayActions = allActions ? [
      SITE_ACTIONS.LEADS,
      SITE_ACTIONS.LIVE,
      SITE_ACTIONS.DELETE
    ] : [...new Set(actions)];

    return displayActions.map(action => {
      switch(action) {
        // case SITE_ACTIONS.CREATE:
        //   return <CreateSiteButton component={Typography} key="create-site" sx={{ ...menuStyles, px: 1 }} />
        case SITE_ACTIONS.LEADS:
          return <LinkButton component={Typography} to={`/sites/${site.id}/leads`} key="view-leads" sx={menuStyles}>
            <ContactMailIcon fontSize="medium" sx={itemStyles} />
            Leads
          </LinkButton>
        case SITE_ACTIONS.LIVE:
          return <LinkButton component={Typography} to={getLiveUrl(site.subdomain)} key="view-live" sx={menuStyles}>
            <RocketLaunchIcon fontSize="medium" sx={itemStyles} />
            Live
          </LinkButton>
        case SITE_ACTIONS.DELETE:
          return <LinkButton 
            key="delete-site"
            component={Typography}
            id={site.id} 
            onClick={handleDelete(site.id)}
            sx={menuStyles}
          >
            <DeleteForeverIcon fontSize="medium" sx={itemStyles} />
            Delete
          </LinkButton>
        default: return <></>
      }
    }).map((link, i) => (<MenuItem
      sx={{ px: 1 }}
      key={i}
      onClick={handleCloseActionsMenu}
    >{link}</MenuItem>))
  }, [actions, site, handleDelete, allActions])

  if (actionList?.length <= 0) {
    return <></>
  }

  return <Box sx={{ 
    flexGrow: 1, 
    justifyContent: 'end', 
    display: { xs: 'flex', md: 'none' } 
  }}>
    <Tooltip title="Site actions">
      <IconButton onClick={anchorElUser ? handleCloseActionsMenu : handleOpenActionsMenu} sx={{ p: 1 }}>
        <SettingsApplicationsIcon />
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
      onClose={handleCloseActionsMenu}
    >
      {actionList}
    </Menu>
  </Box>
  
}

export default SiteActionsMenu
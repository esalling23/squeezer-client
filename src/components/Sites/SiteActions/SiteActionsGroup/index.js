import React, { useMemo } from 'react'
import { Box } from "@mui/material"
import ViewLiveSiteBtn from '../ViewLiveSiteButton'
import ViewLeadsBtn from '../ViewSiteLeadsButton'
import DeleteSiteButton from '../DeleteSiteButton'

export const SITE_ACTIONS = {
  // CREATE: 'create',
  LIVE: 'live',
  LEADS: 'leads',
  DELETE: 'delete',
}
const SiteActionsGroup = ({
  actions = [], // array of SITE_ACTIONS
  allActions = false,
  site,
  handleDelete = () => {},
}) => {
  const actionButtons = useMemo(() => {
    if (!site) return <></>

    const displayActions = allActions ? [
      SITE_ACTIONS.LEADS,
      SITE_ACTIONS.LIVE,
      SITE_ACTIONS.DELETE
    ] : [...new Set(actions)];

    return displayActions.map(action => {
      switch(action) {
        // case SITE_ACTIONS.CREATE:
        //   return <CreateSiteButton key="create-site" />
        case SITE_ACTIONS.LEADS:
          return <ViewLeadsBtn id={site.id} key="view-leads" />
        case SITE_ACTIONS.LIVE:
          return <ViewLiveSiteBtn site={site} key="view-live" />
        case SITE_ACTIONS.DELETE:
          return <DeleteSiteButton 
            key="delete-site"
            id={site.id} 
            handleDelete={handleDelete}
          />
        default: return <></>
      }
    })
  }, [actions, site, handleDelete, allActions])

  return <Box sx={{ justifyContent: 'end' }}>
    {actionButtons}
  </Box>
}

export default SiteActionsGroup
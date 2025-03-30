import React from 'react';

import getLiveUrl from "../../../../lib/getLiveUrl"
import LinkButton from "../../../shared/LinkButton"
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Tooltip } from '@mui/material';

const ViewLiveSiteBtn = ({
  site,
}) => {
  const liveUrl = getLiveUrl(site.subdomain)
  return <Tooltip title="View live site">
    <LinkButton 
      variant="contained"
      to={liveUrl}
      size="large"
      isExternal
      sx={{ width: 'fit-content', px: 2, minWidth: 'auto'}}
    >
      <RocketLaunchIcon fontSize="medium" />
    </LinkButton>
  </Tooltip>
}

export default ViewLiveSiteBtn
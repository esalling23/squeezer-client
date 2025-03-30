import React from 'react';

import LinkButton from "../../../shared/LinkButton"
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Tooltip from '@mui/material/Tooltip';

const ViewLeadsBtn = ({
  id
}) => {
  return <>
    <Tooltip title="See leads">
      <LinkButton 
        variant="contained"
        to={`/sites/${id}/leads`}
        size="large"
        sx={{ width: 'fit-content', px: 2, minWidth: 'auto'}}
      >
        <ContactMailIcon fontSize="medium" />
      </LinkButton>
    </Tooltip>
  </>
}

export default ViewLeadsBtn
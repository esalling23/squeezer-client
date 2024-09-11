import React, { useState } from 'react';

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import LinkButton from '../shared/LinkButton';

function ActionButtons() {
  
	return ( 
		<Box sx={{ flexGrow: 0 }}>
			<ButtonGroup>
				<LinkButton variant="contained" to="/sign-in">Log in</LinkButton>
				<LinkButton variant="contained" to="/sign-up">Sign up</LinkButton>
			</ButtonGroup>
		</Box>
	 );
}

export default ActionButtons;
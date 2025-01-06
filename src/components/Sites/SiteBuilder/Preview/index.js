import React, { useEffect, useMemo, useState } from "react";
import Mustache from 'mustache';

import { Box, CircularProgress, Paper } from "@mui/material";
import { getSiteTemplate } from '../../../../api/templates.js'
import TemplateRenderer from "./TemplateRenderer.js";

const Preview = ({ data }) => {
  return <Box 
		className="preview"
		component={Paper}
		sx={{
			border: '1px solid primary.main', 
			borderRadius: 2,
			display: 'flex',
			flexDirection: 'column',
			minHeight: '60vh'
		}} 
		bgcolor="background.default"
	>
		<Box
			key="preview-window-header"
			display="flex"
			flexDirection="row"
			justifyContent="start"
			alignItems="center"
			bgcolor="white"
			sx={{
				borderRadius: 'inherit',
				borderBottomLeftRadius: 0,
				borderBottomRightRadius: 0,
				height: '30px',
				pl: 1,
				border: 0,
				borderBottom: 1,
				borderColor: 'divider',
				borderStyle: 'solid',
				position: 'sticky',
				top: 0,
				width: 1
			}}
		>
			{['#DD5144', '#FFCD46', '#1DA462'].map(color => 
				<Box
					key={color}
					bgcolor={color}
					sx={{
						borderRadius: 5,
						height: '10px',
						width: '10px',
						mr: 1
					}}
				/>)}
		</Box>

		<TemplateRenderer templateName="template1" data={data} />
	</Box>
};


export default Preview
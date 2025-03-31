import React from "react";

import { Box, Paper } from "@mui/material";
import TemplateRenderer from "./TemplateRenderer.js";

const Preview = ({ data, styles }) => {
  return <Box 
		className="preview"
		component={Paper}
		sx={{
			border: 0, 
      boxShadow: 'none',
			display: 'flex',
			flexDirection: 'column',
			minHeight: '60vh',
      px: { xs: 2, md: 4 }
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
				minHeight: '20px',
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

		<TemplateRenderer templateName="template1" data={data} styles={styles} />
	</Box>
};


export default Preview
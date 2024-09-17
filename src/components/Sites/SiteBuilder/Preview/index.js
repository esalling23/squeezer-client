import React from "react";
import Mustache from 'mustache';

import hbsTemplate from './template/index.js';
import './template/styles.scss';
import { Box } from "@mui/material";

const Preview = ({ data }) => {
  const renderedPreview = Mustache.render(hbsTemplate, data);

  return <Box sx={{ border: '1px solid primary.main', p: 3, m: 3, background: 'white' }}>
		
		<div dangerouslySetInnerHTML={{ __html: renderedPreview }} />
	</Box>
};


export default Preview
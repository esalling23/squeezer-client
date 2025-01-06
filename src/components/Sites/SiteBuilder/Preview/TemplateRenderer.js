import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
// import Mustache from 'mustache'
import Handlebars from 'handlebars';

// import { compile } from 'handlebars-to-jsx';
// import HandlebarsReact from 'handlebars-react';

import { getSiteCss, getSiteTemplate, getSiteVariables } from '../../../../api/templates';
import { useAppContext } from '../../../../context/AppContext';
import { useParams } from 'react-router';

const TemplateRenderer = ({ templateName, data }) => {
	const { addAlert } = useAppContext();
	const { id: siteId } = useParams();
  const [templateContent, setTemplateContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  // const [cssContent, setCssContent] = useState('');

	const loadedRef = useRef(false);

	// fetch template & css
  useEffect(() => {
		// only fetch once
		if (!templateName || loadedRef.current) return;

		let style

    const loadTemplate = async () => {
      try {
        // Fetch Handlebars template and CSS
        const [templateResponse, cssResponse, variablesResponse] = await Promise.all([
          getSiteTemplate(templateName),
					getSiteCss(templateName),
					getSiteVariables(templateName),
        ]);

				setTemplateContent(templateResponse.data)

        // Inject base CSS into the page
        style = document.createElement('style');
        style.textContent = variablesResponse.data + cssResponse.data;
        document.head.appendChild(style);

				loadedRef.current = true;
      } catch (error) {
        addAlert({
					heading: 'Something went wrong',
					severity: 'error'
				})
      }
    };

    loadTemplate();

		return () => {
			console.log('template renderer cleanup')
			loadedRef.current = false;
			if (style)
				document.head.removeChild(style);
		}
  }, [templateName, templateContent, addAlert, siteId]);

	// Render hbs template on updates
	useEffect(() => {
		const displayData = Object.entries(data).reduce((acc, [key, value]) => {
			acc[key] = (value instanceof File || value instanceof Blob) ? URL.createObjectURL(value) : value;
			return acc;
		}, {});
	
		const compiledHtml = Handlebars.compile(templateContent)({ site: displayData });
		setHtmlContent(compiledHtml);
	}, [templateContent, data])

	if (!htmlContent) {
		return <CircularProgress color="inherit" />
	}

  return (
    <Box
			dangerouslySetInnerHTML={{ __html: htmlContent }}
			sx={{ flexGrow: 1, h: 1, '.site > *': { scale: 0.5 } }}
		/>
  );
};

export default TemplateRenderer;

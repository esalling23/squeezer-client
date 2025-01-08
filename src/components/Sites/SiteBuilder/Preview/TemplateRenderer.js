import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Handlebars from 'handlebars';

import { getBaseCssVars, getSiteCss, getSiteTemplate, getUserCssVars } from '../../../../api/templates';
import { useAppContext } from '../../../../context/AppContext';
import { useParams } from 'react-router';
import { isFontDoc } from '../../../../lib/styles';

const TemplateRenderer = ({ templateName, data, styles }) => {
	const { addAlert } = useAppContext();
	const { id: siteId } = useParams();
  const [templateContent, setTemplateContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

	const loadedRef = useRef(false);

	// fetch template & css
  useEffect(() => {
		// only fetch once
		if (!templateName || loadedRef.current) return;

		let style

    const loadTemplate = async () => {
      try {
        // Fetch Handlebars template and CSS
        const [
          templateResponse, 
          cssResponse, 
          baseCssVarsResponse,
          userCssVarsResponse
        ] = await Promise.all([
          getSiteTemplate(templateName),
					getSiteCss(templateName),
					getBaseCssVars(templateName),
					getUserCssVars(templateName),
        ]);

				setTemplateContent(templateResponse.data)

        // Inject base CSS into the page
        style = document.createElement('style');
        style.textContent = baseCssVarsResponse.data 
          + userCssVarsResponse.data 
          + cssResponse.data;
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

    const fontLinks = Object.keys(styles).reduce((fonts, key) => {
      if (isFontDoc(styles[key])) {
        return [...fonts, styles[key].url]
      }
      return fonts
    }, [])
	
		const compiledHtml = Handlebars.compile(templateContent)({ 
      site: displayData,
      fontLinks
    });
		setHtmlContent(compiledHtml);
	}, [templateContent, styles, data])

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

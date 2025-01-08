import React, { useCallback, useMemo } from 'react'

import { Box, Button, Divider, LinearProgress, Stack } from '@mui/material';

import { useAppContext } from '../../../../context/AppContext';
import { useUserContext } from '../../../../context/UserContext';
import formSections from '../builderStaticInputs';
import FormTextInput from './FormTextInput';
import FormUploadInput from './FormUploadInput';
import { updateSite } from '../../../../api/sites';
import FormColorInput from './FormColorInput';
import FormFontInput from './FormFontInput';

const FormSection = ({ section, setSiteData, site, setStyleData, style }) => {
	const { user, loading } = useUserContext();
	const { addAlert } = useAppContext();

	const handleFormChange = useCallback((data) => {
		setSiteData(curr => ({ ...curr, ...data }))
	}, [setSiteData])

	const handleStyleChange = useCallback((data) => {
		setStyleData(curr => ({ ...curr, ...data }))
	}, [setStyleData])

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Need to use form data to handle any files etc.
		const siteChanges = new FormData();

		for (const key in site) {
			siteChanges.append(key, site[key])
		}
    // for (const [key, value] of siteChanges.entries()) {
    //   console.log(key, value);
    // }

		siteChanges.append('style', JSON.stringify(style))

		try {
			const res = await updateSite(user, site.id, siteChanges)
			addAlert({
				heading: 'Success!',
				message: `Site ${site ? 'updated' : 'created'}!`,
				severity: 'success',
			})
			setSiteData(curr => ({
				...curr, 
				...res.data.site
			}))
		} catch (error) {
			addAlert({
				heading: 'Something went wrong',
				message: error.message,
				severity: 'error',
			})
		}
	}

  const getFormFieldContent = useCallback((input) => {
    switch (input.type) {
      case 'image': 
        return <FormUploadInput
          key={`${section}${input.name}`}
          {...input}
          handleFormChange={handleFormChange}
          startingValue={site[input.name]}
        />
      case 'text':
      case 'email':
        return <FormTextInput
          key={`${section}${input.name}`}
          {...input}
          handleFormChange={handleFormChange}
          startingValue={site[input.name]}
        />
      case 'color':
        return <FormColorInput 
          key={`${section}${input.name}`}
          {...input} 
          handleFormChange={handleStyleChange} 
          startingValue={style[input.name]}
        />;
      case 'font': 
        return <FormFontInput
          key={`${section}${input.name}`}
          {...input}
          handleFormChange={handleStyleChange} 
          startingValue={style[input.name]}
        />
      default: 
        return <>{input.component}</>
    }
  }, [section, site, handleFormChange, handleStyleChange, style])

	const formFieldsContent = useMemo(() => {
		if (!section || !site) return '';
		const sectionFields = formSections[section]?.elements || [];
		return sectionFields.map((input, i) => {
			return (
        <div style={{ display: 'contents' }} key={`container-${section}-${i}`}>
          {getFormFieldContent(input)}
          {i < sectionFields.length - 1 && <Divider />}
        </div>
      )
		})
	}, [section, site, getFormFieldContent])

	if (loading) {
		return <LinearProgress />
	}

	return (
		<Box sx={{ width: '100%', height: 1, flexGrow: 1, mb: 5, backgroundColor: 'white' }}>
			{loading ? (<LinearProgress />) : (<>
				<form 
          onSubmit={handleSubmit} 
          style={{ height: '100%', width: '100%', overflowY: 'scroll', padding: '2rem' }}
        >
					<Stack 
						sx={{ position: 'relative', height: 'fit-content' }}
						spacing={{ xs: 5 }}
						useFlexGap
					>
						<Stack
              spacing={{ xs: 1, md: 2 }}
              useFlexGap
            >
              {formFieldsContent}
            </Stack>
						<Button 
							sx={{ width: 1, height: '50px' }} 
							variant="contained" 
							type="submit"
						>Save</Button>
					</Stack>
				</form>
			</>)}
		</Box>
	);
}
 
export default FormSection;
import React, { useCallback, useMemo } from 'react'
import { HexColorPicker } from "react-colorful";

import { Box, Button, LinearProgress, Stack } from '@mui/material';

import { useAppContext } from '../../../../context/AppContext';
import { useUserContext } from '../../../../context/UserContext';
import formSections from '../builderStaticInputs';
import FormTextInput from './FormTextInput';
import FormUploadInput from './FormUploadInput';
import { updateSite } from '../../../../api/sites';
import FormColorInput from './FormColorInput';

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

		console.log(site)

		for (const key in site) {
			siteChanges.append(key, site[key])
		}

    for (const [key, value] of siteChanges.entries()) {
      console.log(key, value);
    }

		siteChanges.append('style', style)

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

	const formFieldsContent = useMemo(() => {
		if (!section || !site) return '';
		const sectionFields = formSections[section]?.elements || [];
		return sectionFields.map((input) => {
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
				default: 
					return <>{input.component}</>
			}
		})
	}, [section, site, handleFormChange, handleStyleChange, style])

	if (loading) {
		return <LinearProgress />
	}

	return (
		<Box sx={{ width: '100%', height: 1, flexGrow: 1 }}>
			{loading ? (<LinearProgress />) : (<>
				<form onSubmit={handleSubmit} style={{ height: '100%', width: '100%' }}>
					<Stack 
						sx={{ position: 'relative', height: 1 }}
						spacing={{ xs: 1, sm: 2 }}
						useFlexGap
					>
						{formFieldsContent}
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
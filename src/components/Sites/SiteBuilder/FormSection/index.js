import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'

import { Box, Button, LinearProgress, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { useAppContext } from '../../../../context/AppContext';
import { useUserContext } from '../../../../context/UserContext';
import formSections from '../builderStaticInputs';
import FormTextInput from './FormTextInput';
import FormUploadInput from './FormUploadInput';

const FormSection = ({ section, setSiteData, site }) => {
	const { user: { token }, loading, refreshData } = useUserContext();
	const { addAlert } = useAppContext();

	const [formData, setFormData] = useState({})

	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const url = `/api/sites${site ? `/${site.id}` : ''}`;
			const method = site ? 'patch' : 'post'
			const res = await axios({
				url,
				method,
				data: formData,
				headers: { 'Authorization': 'Bearer ' + token } 
			});
			addAlert({
				heading: 'Success!',
				message: `Site ${site ? 'updated' : 'created'}!`,
				severity: 'success',
			})
			setSiteData(curr => ({
				...curr, 
				...res.site
			}))
			if (site) {
				refreshData();
			} else {
				navigate(`/sites/${res.data.id}`);
			}
		} catch (error) {
			addAlert({
				heading: 'Something went wrong',
				message: error.message,
				severity: 'error',
			})
		}
	}

	const handleCopyEmbed = () => {
		navigator.clipboard.writeText('')
	}

	const formFieldsContent = useMemo(() => {
		if (!section || !site) return '';
		const sectionFields = formSections[section];
		return sectionFields.map((input) => {
			switch (input.type) {
				case 'image': 
					return <FormUploadInput
						key={`${section}${input.name}`}
						{...input}
						setFormData={setFormData}
						startingValue={site[input.name]}
					/>
				default:
					return <FormTextInput
						key={`${section}${input.name}`}
						{...input}
						setFormData={setFormData}
						startingValue={site[input.name]}
					/>
			}
		})
	}, [section, site])

	const extraSectionContent = useMemo(() => {
		switch (section) {
			case 'launch':
				return (
					<Box 
						sx={{ 
							height: '300px', 
							width: 1, 
							overflow: 'scroll', 
							position: 'relative',
							border: '1px solid orange',
							background: 'white',
							p: 2
						}}>
						<Button 
							onClick={handleCopyEmbed} 
							sx={{ top: 0, right: 0, position: 'absolute' }}
						>
							<ContentCopyIcon />
						</Button>
						{/* Embed content */}
						{'<embed></embed>'}
					</Box>
				)
			default: 
		}
	}, [section])

	if (loading) {
		return <LinearProgress />
	}

	return (
		<Box sx={{ width: '100%', my: 2, flexGrow: 1 }}>
			{loading ? (<LinearProgress />) : (<>
				{extraSectionContent}
				<form onSubmit={handleSubmit}>
					<Stack>
						{formFieldsContent}
						<Button type="submit">Save</Button>
					</Stack>
				</form>
			</>)}
		</Box>
	);
}
 
export default FormSection;
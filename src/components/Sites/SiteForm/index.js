import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import { Box, Button, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useAppContext } from '../../../context/AppContext';
import { useUserContext } from '../../../context/UserContext';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const SiteForm = () => {
	const { user: { token }, sites, loading, refreshData } = useUserContext();
	const { addAlert } = useAppContext();

	const { id: siteId } = useParams();
	const navigate = useNavigate();

	const site = useMemo(() => sites?.find(({ id }) => id.toString() === siteId), [sites, siteId])

	const [title, setTitle] = useState('');
	const [hero, setHero] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title) {
			return;
		}

		const formData = new FormData();
		formData.append('heroImage', hero);
		formData.append('pageTitle', title);
		formData.append('subdomain', title.replace(' ', '_'))

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

	useEffect(() => {
		setTitle(site?.pageTitle || '')
		setHero(site?.heroImage || null)
	}, [site])

	if (loading) {
		return <LinearProgress />
	}

	return (
		<Box sx={{ width: '100%' }}>
			{loading ? (<LinearProgress />) : (
				<form onSubmit={handleSubmit}>
					<TextField
						type="text"
						name="pageTitle"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Button
						component="label"
						role={undefined}
						variant="contained"
						tabIndex={-1}
						startIcon={<CloudUploadIcon />}
					>
						Upload files
						<VisuallyHiddenInput
							type="file"
							onChange={(event) => setHero(event.target.files[0])}
							multiple
						/>
					</Button>
					<Button type="submit">Save</Button>
				</form>
			)}
		</Box>
	);
}
 
export default SiteForm;
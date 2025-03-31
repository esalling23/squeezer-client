import { Button, Typography } from "@mui/material";
import { createSite } from "../../../../api/sites"
import { useUserContext } from "../../../../context/UserContext"
import PostAddIcon from '@mui/icons-material/PostAdd'
import { useNavigate } from "react-router";
import { useAppContext } from "../../../../context/AppContext";
import { useCallback } from "react";

const CreateSiteButton = ({
  component: Component = Button,
  sx = {}
}) => {
	const { addAlert } = useAppContext()
	const { user, refreshData } = useUserContext();
	const navigate = useNavigate();

	const onClick = useCallback(() => {
		createSite(user)
			.then(res => {
				addAlert({
					heading: 'New Site Created Successfully', 
					message: 'Edit your site and preview changes', 
					severity: 'success'
				})
				refreshData();
				navigate(`/sites/${res.data.id}`)
			})
			.catch(console.error)
	}, [addAlert, navigate, user, refreshData])

	return (
		<Component 
      onClick={onClick} 
      sx={sx}
      variant="contained"
    >
			<PostAddIcon />
			<Typography sx={{ display: { xs: 'none', sm: 'flex' }}}>New Site</Typography>
		</Component>
	)
}

export default CreateSiteButton
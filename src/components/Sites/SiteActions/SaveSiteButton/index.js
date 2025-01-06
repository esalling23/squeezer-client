import { Button } from "@mui/material";
import { createSite } from "../../../../api/sites"
import { useUserContext } from "../../../../context/UserContext"
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useNavigate } from "react-router";
import { useAppContext } from "../../../../context/AppContext";

const SaveSiteButton = () => {
	const { addAlert } = useAppContext()
	const { user, refreshData } = useUserContext();
	const navigate = useNavigate();

	const onClick = () => {
		createSite(user)
			.then(res => {
				addAlert({
					heading: 'Changes aved Successfully', 
					message: 'View changes live or continue editing', 
					severity: 'success'
				})
				refreshData();
				navigate(`/sites/${res.data.id}`)
			})
			.catch(console.error)
	}

	return (
		<Button onClick={onClick}>
			<SaveAsIcon />
			Save Changes
		</Button>
	)
}

export default SaveSiteButton
import { CircularProgress, Fade, Grid2, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { useAppContext } from "../../../context/AppContext";
import LeadTable from "./LeadTable";
import { useParams } from "react-router";
import { indexLeads } from "../../../api/leads";

function LeadsView() {
	const { addGenericError } = useAppContext()
	const { id: siteId } = useParams();
	const { user } = useUserContext()

	const [leads, setLeads] = useState(null);

	// to do - update with live leads getting added
	
	useEffect(() => {
		if (leads) return;
		indexLeads(user, siteId)
			.then(res => {
				setLeads(res.data)
			})
			.catch(err => {
				addGenericError(err.message)
			})
	}, [addGenericError, user, leads, siteId])

	if (!leads) {
		return <CircularProgress />
	}

	return (
		<Fade in={true}>
			<div><LeadTable leads={leads} /></div>
		</Fade>
	);
}

export default LeadsView;
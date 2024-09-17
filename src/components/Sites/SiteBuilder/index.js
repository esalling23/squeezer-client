import { CssBaseline, Grid2, Typography } from "@mui/material";
import ResponsiveDrawer from "../ResponsiveDrawer";
import { useEffect, useMemo, useState } from "react";
import FormSection from "./FormSection";
import { useNavigate, useParams } from "react-router";
import { createSite } from "../../../api/sites";
import { useUserContext } from "../../../context/UserContext";
import Preview from "./Preview";

function SiteBuilder({ isNew }) {
	const navigate = useNavigate();
	const { id: siteId } = useParams();
	const { user, refreshData, sites } = useUserContext()

	const [builderSection, setBuilderSection] = useState(null);
	const [siteData, setSiteData] = useState({});

	const site = useMemo(() => sites?.find(({ id }) => id.toString() === siteId), [sites, siteId])

	useEffect(() => {
		if (isNew && user) {
			createSite(user)
				.then(res => {
					refreshData();
					navigate(`/sites/${res.data.id}`)
				})
				.catch(console.log)
		}
	}, [isNew, user, navigate, refreshData])

	useEffect(() => {
		if (site) {
			setSiteData(site);
		}
	}, [site])

	return (
		<Grid2 container wrap="nowrap" position="relative">
      <CssBaseline />
			<ResponsiveDrawer setSection={setBuilderSection} />
			<Grid2 size="grow">
				<FormSection section={builderSection} setSiteData={setSiteData} site={site} />
			</Grid2>
			<Grid2 size="grow">
				<Typography>Preview</Typography>
				<Preview data={siteData} />
			</Grid2>
		</Grid2>
	);
}

export default SiteBuilder;
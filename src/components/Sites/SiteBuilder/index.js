import { CircularProgress, Fade, Grid2, Paper, styled, Typography } from "@mui/material";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { useEffect, useState } from "react";
import FormSection from "./FormSection";
import { useParams } from "react-router";
import { getSite } from "../../../api/sites";
import { useUserContext } from "../../../context/UserContext";
import Preview from "./Preview";
import { useAppContext } from "../../../context/AppContext";
import { isFontDoc } from "../../../lib/styles";

const SectionTitle = ({ children, color }) => {
	return <Typography 
		sx={{ textAlign: 'left', letterSpacing: 2, fontWeight: 800, mb: 4 }}
		color={color || "text.disabled"}
		variant="h5"
	>{children}</Typography>
}

const SectionContainer = styled(Grid2)(({ theme, bgcolor }) => ({
	padding: '10px', 
	display: 'flex',
	flexDirection: 'column',
	minWidth: '400px',
}))

function SiteBuilder() {
	const { addGenericError } = useAppContext()
	const { id: siteId } = useParams();
	const { user } = useUserContext()

	const [builderSection, setBuilderSection] = useState(null);
	const [site, setSite] = useState(null);

  // Map of user-set site data like page title, tagline, hero image, etc.
	const [siteData, setSiteData] = useState({});
  // Map of user-set style data like brand color, font family, etc.
	const [styleData, setStyleData] = useState({});
	
	useEffect(() => {
		if (site) return;
		getSite(user, siteId)
			.then(res => {
				setSite(res.data)
				setStyleData(res.data.theme)
			})
			.catch(err => {
				addGenericError(err.message)
			})
	}, [addGenericError, user, site, siteId])

	useEffect(() => {
		if (site) {
			setSiteData(site);
		}
	}, [site])

	useEffect(() => {
		for(const key in styleData)
		{
			if (styleData[key] === null) continue;
      const value = isFontDoc(styleData[key]) ? styleData[key].family : styleData[key]

			const propName = `--${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
			document.documentElement.style
				.setProperty(propName, value);
		}
	}, [styleData])

	if (!site?.subdomain) {
		return <CircularProgress />
	}

	return (
		<Fade in={true}>
			<Grid2 container wrap="nowrap" position="relative" height={'calc(100vh - 140px)'}>
				<ResponsiveDrawer setSection={setBuilderSection} />
				<SectionContainer size="grow">
					<SectionTitle color="text.default">{builderSection?.toUpperCase() || ''}</SectionTitle>
					<FormSection
						section={builderSection}
						setSiteData={setSiteData}
						site={siteData}
						setStyleData={setStyleData}
						style={styleData}
					/>
				</SectionContainer>
				<SectionContainer size="grow" bgcolor='background.default'>
					<SectionTitle>PREVIEW</SectionTitle>
					<Preview data={siteData} styles={styleData} />
				</SectionContainer>
			</Grid2>
		</Fade>
	);
}

export default SiteBuilder;
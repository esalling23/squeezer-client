import { Box, Button } from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { useUserContext } from "../../../../context/UserContext"
import { useParams } from "react-router";
import { useMemo } from "react";

const EmbedBox = () => {
  const { id: siteId } = useParams();
  const { getSite } = useUserContext();

  const site = useMemo(() => getSite(siteId), [siteId, getSite])

  const embed = useMemo(() => {
    return `
      <iframe 
        src="https://${site.subdomain}.squeezer.eronsalling.me" 
        width="100%" 
        height="790px" 
        frameBorder="0" 
        style="border: 0;"
      ></iframe>
      <br>Brought to you by <a href="https://${site.subdomain}.squeezer.eronsalling.me" target="_blank">${site.subdomain}</a>`
  }, [site])

	const handleCopyEmbed = () => {
		navigator.clipboard.writeText(embed)
	}
	return (
		<Box
			sx={{ 
				height: '100px', 
				width: 1, 
				overflow: 'scroll', 
				position: 'relative',
				border: '1px solid orange',
				background: 'white',
				p: 2,
				mb: 3
			}}>
			<Button 
				onClick={handleCopyEmbed} 
				sx={{ top: 0, right: 0, position: 'absolute' }}
			>
				<ContentCopyIcon />
			</Button>
			{embed}
		</Box>
	)
}

export default EmbedBox
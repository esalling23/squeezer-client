import { Box, Button } from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

const EmbedBox = () => {

	const handleCopyEmbed = () => {
		navigator.clipboard.writeText('')
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
			{/* Embed content */}
			{'<embed></embed>'}
		</Box>
	)
}

export default EmbedBox
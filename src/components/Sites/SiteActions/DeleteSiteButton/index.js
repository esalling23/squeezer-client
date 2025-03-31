import { Button, Tooltip } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const DeleteSiteButton = ({
  id,
  handleDelete,
  component: Component = Button
}) => {
  return <Tooltip title="Delete site">
    <Component
      variant="contained" 
      color="error"
      onClick={handleDelete(id)}
      sx={{ width: 'fit-content', height: 'fit-content', px: 1, mx: 1, minWidth: 'auto' }}
    >
      <DeleteForeverIcon fontSize="small" />
    </Component>
  </Tooltip>
}

export default DeleteSiteButton
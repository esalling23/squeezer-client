import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { deleteSite } from '../../../api/sites';
import { useAppContext } from '../../../context/AppContext';
import { useUserContext } from '../../../context/UserContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const ConfirmDeleteSiteModal = ({
  siteId,
  handleClose,
}) => {
  const { addAlert, addGenericError } = useAppContext()
  const { user } = useUserContext()

  const handleConfirm = () => {
    deleteSite(user, siteId)
      .then(() => {
        handleClose();
        addAlert({
          heading: 'Site Deleted',
          message: 'Success! That site is no more.',
          severity: 'success'
        })
      })
      .catch(err => addGenericError(err.message))
  }

  return (
    <Modal
      open={siteId !== null}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Deleting a site cannot be undone.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Confirm delete?
        </Typography>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
        >Yes, delete this site</Button>
      </Box>
    </Modal>
  )
}

export default ConfirmDeleteSiteModal
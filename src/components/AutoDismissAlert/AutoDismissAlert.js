import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import AlertTitle from '@mui/material/AlertTitle';
import { useAppContext } from '../../context/AppContext';

const AutoDismissAlert = ({
	variant = 'filled',
	severity = 'info',
	heading,
	message,
	id
}, ref) => {
	const { deleteAlert } = useAppContext();
	const handleClose = useCallback(() => deleteAlert(id), [deleteAlert, id])

  useEffect(() => {
		let timeoutId = setTimeout(handleClose, 5000);

		return function () {
			clearTimeout(timeoutId)
		}
  }, [handleClose])

  return (
    <Alert
			ref={ref}
      variant={variant}
			severity={severity}
      onClose={handleClose}
			sx={{ position: "fixed", right: 0 }}
		>
      <div className='container'>
        <AlertTitle>{heading}</AlertTitle>
        <Typography className='alert-body'>{message}</Typography>
      </div>
    </Alert>
  )
}

export default forwardRef(AutoDismissAlert)

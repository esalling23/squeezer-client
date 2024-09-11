import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import { changePasswordSuccess, changePasswordFailure } from '../AutoDismissAlert/messages'

import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button'

import useFormData from '../../hooks/useFormData';
import { useAppContext } from '../../context/AppContext';
import { useUserContext } from '../../context/UserContext';

const ChangePassword = () => {
	const { addAlert } = useAppContext();
	const { user } = useUserContext();
	const navigate = useNavigate();

  const [formData, handleChange, resetData] = useFormData({ oldPassword: '', newPassword: '' })

  const onChangePassword = (event) => {
    event.preventDefault()

    changePassword(formData, user)
      .then(() =>
        addAlert({
          heading: 'Change Password Success',
          message: changePasswordSuccess,
          severity: 'success'
        })
      )
      .then(() => navigate('/'))
      .catch((error) => {
        resetData()
        addAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: changePasswordFailure,
          severity: 'error'
        })
      })
  }

  return (
    <>
      <h5>Change Password</h5>
      <form onSubmit={onChangePassword}>
        <FormGroup>
          <InputLabel>Old password</InputLabel>
          <FormControl
            required
            name='oldPassword'
            value={formData.oldPassword}
            type='password'
            placeholder='Old Password'
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel>New Password</InputLabel>
          <FormControl
            required
            name='newPassword'
            value={formData.newPassword}
            type='password'
            placeholder='New Password'
            onChange={handleChange}
          />
        </FormGroup>
        <Button variant='contained' type='submit'>Submit</Button>
      </form>
    </>
  )
}

export default ChangePassword

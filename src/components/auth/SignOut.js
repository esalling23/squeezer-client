import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { signOut } from '../../api/auth'
import { signOutSuccess } from '../AutoDismissAlert/messages'
import { useAppContext } from '../../context/AppContext'
import { useUserContext } from '../../context/UserContext'

const SignOut = () => {
	const { addAlert } = useAppContext();
	const { user, clearUser } = useUserContext();

	const navigate = useNavigate()
  useEffect(() => {
    signOut(user)
      .finally(() => {
				addAlert({
          heading: 'Signed Out Successfully',
          message: signOutSuccess,
          severity: 'success'
        })
				clearUser()
				navigate('/')
			})
  }, [])

  return '';
}

export default SignOut

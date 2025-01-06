import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { useEffect } from 'react';

const AuthenticatedRoute = ({
  children
}) => {
	const { user } = useUserContext();
	const navigate = useNavigate()
	useEffect(() => {
		if (!user) {
			// user is not authenticated
			navigate("/sign-in");
		}
	}, [user, navigate])
  return children;
}

export default AuthenticatedRoute

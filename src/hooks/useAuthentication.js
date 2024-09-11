import { useEffect, useState } from 'react';

const useAuthenticated = () => {
  const [user, setUser] = useState(null);

	const clearUser = () => setUser(null)

	useEffect(() => {
		if (user) {
			window.localStorage.setItem('user', JSON.stringify(user))
		} else if (!user && window.localStorage.getItem('user')) {
			setUser(JSON.parse(window.localStorage.getItem('user')));
		}
	}, [user])

	return {
		user,
		setUser,
		clearUser
	}
}

export default useAuthenticated;
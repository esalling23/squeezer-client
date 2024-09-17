import { useEffect, useState } from 'react';

const useAuthCookie = () => {
  const [user, setUser] = useState(null);

	const clearUser = () => {
		setUser(null)
		window.localStorage.setItem('user', null)
	}

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

export default useAuthCookie;
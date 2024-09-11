import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useAuthenticated from '../hooks/useAuthentication';

const UserContext = createContext();

export const useUserContext = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	const { user, setUser, clearUser } = useAuthenticated();

	const [sites, setSites] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const refreshData = useCallback(async () => {
		if (!user) return;
		setLoading(true);
		try {
			const response = await axios.get('/api/sites/user', {
				headers: { 'Authorization': 'Bearer ' + user.token } 
			});
			setSites(response.data);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [user]);

	useEffect(() => {
		refreshData();
	}, [refreshData]);

	const value = useMemo(() => ({
		refreshData,
		sites,
		getSite: (id) => sites?.find(site => site.id.toString() === id),
		loading,
		error,
		clearUser,
		setUser,
		user,
		isAuthenticated: !!user,
	}), [refreshData, sites, loading, error, user, clearUser, setUser]);

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
};

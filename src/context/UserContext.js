import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useAuthCookie from '../hooks/useAuthCookie';
import { indexSites } from '../api/sites';

const UserContext = createContext();

export const useUserContext = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	const { user, login, logout } = useAuthCookie();

	const [sites, setSites] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const refreshData = useCallback(async () => {
		if (!user) {
			setLoading(false);
			return;
		}
		setLoading(true);
		try {
			const response = await indexSites(user);
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

	const getSite = useCallback((id) => sites?.find(site => site.id.toString() === id), [sites])

	const value = useMemo(() => ({
		refreshData,
		sites,
		getSite,
		loading,
		error,
		logout,
		login,
		user,
		isAuthenticated: !!user,
	}), [refreshData, sites, getSite, loading, error, user, login, logout]);

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
};

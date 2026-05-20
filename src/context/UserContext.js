import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authClient, useSession } from '../lib/authClient';
import { indexSites } from '../api/sites';

const UserContext = createContext();

export const useUserContext = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	const navigate = useNavigate();
	const { data: session, isPending } = useSession();

	// Better Auth returns user.id as a string at its API boundary; coerce
	// to Number so downstream code (site queries, etc.) keeps working.
	const user = useMemo(() => {
		if (!session?.user) return null;
		return { ...session.user, id: Number(session.user.id) };
	}, [session]);

	const [sites, setSites] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const refreshData = useCallback(async () => {
		if (!user) {
			setSites(null);
			setLoading(false);
			return;
		}
		setLoading(true);
		try {
			const response = await indexSites();
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

	const login = useCallback(() => {
		navigate('/sites');
	}, [navigate]);

	const logout = useCallback(async () => {
		await authClient.signOut();
		navigate('/', { replace: true });
	}, [navigate]);

	const value = useMemo(() => ({
		refreshData,
		sites,
		getSite,
		loading: loading || isPending,
		error,
		logout,
		login,
		user,
		isAuthenticated: !!user,
	}), [refreshData, sites, getSite, loading, isPending, error, user, login, logout]);

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
};

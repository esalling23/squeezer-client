import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid'
const AppContext = createContext();

export const useAppContext = () => {
		return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
	const [alerts, setAlerts] = useState([]);

  const deleteAlert = useCallback((id) => {
    setAlerts(alerts => alerts.filter((msg) => msg.id !== id))
  }, [])


  const addAlert = useCallback(({ heading, message, variant, severity }) => {
    const id = uuid()
    setAlerts(alerts => [...alerts, { heading, message, variant, severity, id }])
  }, [])

	const addGenericError = useCallback((message) => {
		addAlert({
			heading: 'Something went wrong...',
			message, 
			severity: 'error'
		})
	}, [addAlert])

	const value = useMemo(() => ({
		addAlert,
		addGenericError,
		deleteAlert,
		alerts
	}), [addAlert, addGenericError, deleteAlert, alerts]);

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};

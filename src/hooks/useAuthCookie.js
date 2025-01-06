import { useNavigate } from 'react-router';
import { useLocalStorage } from './useLocalStorage';

const useAuthCookie = () => {
	const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", null);

	// call this function when you want to authenticate the user
	const login = async (data) => {
		setUser(data);
		navigate("/sites");
	};

	// call this function to sign out logged in user
	const logout = () => {
		setUser(null);
		navigate("/", { replace: true });
	};

	return {
		user,
		logout,
		login
	}
}

export default useAuthCookie;
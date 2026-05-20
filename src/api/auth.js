import { authClient } from '../lib/authClient';

const throwIfError = ({ data, error }) => {
	if (error) throw new Error(error.message || 'Auth request failed');
	return { data };
};

export const signUp = (credentials) =>
	authClient.signUp
		.email({
			email: credentials.email,
			password: credentials.password,
			name: credentials.name || credentials.email.split('@')[0],
		})
		.then(throwIfError);

export const signIn = (credentials) =>
	authClient.signIn
		.email({
			email: credentials.email,
			password: credentials.password,
		})
		.then(throwIfError);

export const signOut = () => authClient.signOut();

export const signInWithGoogle = (callbackURL = '/sites') =>
	authClient.signIn.social({ provider: 'google', callbackURL });

export const changePassword = (passwords) =>
	authClient
		.changePassword({
			currentPassword: passwords.oldPassword,
			newPassword: passwords.newPassword,
		})
		.then(throwIfError);

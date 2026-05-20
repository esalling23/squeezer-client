import { createAuthClient } from 'better-auth/react';
import isLocalEnv from './isLocalEnv';

const baseURL = isLocalEnv()
	? 'http://localhost:8080'
	: 'https://squeezer.eronsalling.me';

export const authClient = createAuthClient({ baseURL });

export const { signIn, signUp, signOut, useSession } = authClient;

import axios from 'axios';
import isLocalEnv from '../lib/isLocalEnv';

let url = 'https://squeezer.eronsalling.me';

if (isLocalEnv()) {
	url = 'http://localhost:8080'
}
axios.defaults.baseURL = url;
// Better Auth issues session cookies; axios must include them on cross-origin
// requests to /api/sites, /api/fonts, etc.
axios.defaults.withCredentials = true;

export default url

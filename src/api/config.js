import axios from 'axios';
import isLocalEnv from '../lib/isLocalEnv';

let url = 'https://squeezer.eronsalling.me';

if (isLocalEnv()) {
	url = 'http://localhost:8080'
}
axios.defaults.baseURL = url;

export default url

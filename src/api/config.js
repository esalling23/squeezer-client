import axios from 'axios';

let url = 'https://squeezer.eronsalling.me';

if (window.location.hostname === 'localhost') {
	url = 'http://localhost:8080'
}

axios.defaults.baseURL = url;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './styles/index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './api/config'
import { AppProvider } from './context/AppContext';
import { UserProvider } from './context/UserContext';
import isLocalEnv from './lib/isLocalEnv';

if (isLocalEnv()) {
  import('./styles/materialize-development.scss');
} else {
  import('./styles/materialize-production.scss');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<HashRouter>
			<AppProvider>
				<UserProvider>
					<App />
				</UserProvider>
			</AppProvider>
		</HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

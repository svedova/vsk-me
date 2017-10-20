import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CloudFlash from "cloudflash.io-client"
import registerServiceWorker from './registerServiceWorker';

// This is required
window.CloudFlash = CloudFlash

ReactDOM.hydrate(<App />, document.getElementById('root'));
registerServiceWorker();

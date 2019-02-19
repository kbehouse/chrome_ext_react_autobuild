import React from 'react';
import ReactDOM from 'react-dom';
import './css/bulma.min.css';
import './css/override_bulma.css';
import './css/application.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

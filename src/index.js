import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import List from './list';

ReactDOM.render(<List gap={100} />, document.getElementById('root'));
registerServiceWorker();

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from 'serviceWorker';
import Root from 'Root';
import 'index.css';

enableES5();

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// eslint-disable-next-line import/no-unresolved
import 'react-cat-tree/style.css';
import './styles.css';

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

import React from 'react';
import ReactDOM from 'react-dom';
import DataProvider from './store/DataProvider';
import 'material-design-icons/iconfont/material-icons.css';
import App from './App';
import './index.scss';


ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
        <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
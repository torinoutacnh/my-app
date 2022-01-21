import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Put any other imports below so that CSS from your
import 'bootstrap/dist/css/bootstrap.css';

// // Ennviroment import
// require('dotenv').config()
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

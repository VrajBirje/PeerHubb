import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import {CookiesProvider} from "react-cookie";
import{ToastProvider} from 'react-toast-notifications'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//    <ToastProvider autoDismiss autoDismissTimeout={4000} placement="top-right">
//    <Router>
//       <App />
//   </Router>
//   </ToastProvider>
// );

ReactDOM.render(
   <React.StrictMode>
     <Router> {/* Wrap your App component with BrowserRouter */}
       <ToastProvider autoDismiss autoDismissTimeout={4000} placement="top-right">
         <App />
       </ToastProvider>
     </Router>
   </React.StrictMode>,
   document.getElementById('root')
 );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM from 'react-dom'
import App from './App';
const favIcon=document.getElementById('favIcon');
favIcon.href='/resources/react/img/logo.png';
ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <App />
        
    </React.StrictMode>
);

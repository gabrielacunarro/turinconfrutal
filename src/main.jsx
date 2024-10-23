import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB_2SqRzCgcsoLeP5p6TMV1g16L7DwVKIM",
  authDomain: "turinconfrutal-ce92e.firebaseapp.com",
  projectId: "turinconfrutal-ce92e",
  storageBucket: "turinconfrutal-ce92e.appspot.com",
  messagingSenderId: "647777712677",
  appId: "1:647777712677:web:57fb9a27630f0ee73f5dcc"
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

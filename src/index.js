import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/scss/base/_base.module.scss'
import {Provider} from "react-redux";
import {store} from "./app/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    // </React.StrictMode>
)
;
reportWebVitals();

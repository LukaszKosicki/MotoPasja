import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { createStore } from "redux";
import navbar from "./store/reducers/navbar";
import { combineReducers } from "redux";

var destination = document.querySelector('#root');
/*
var combine = combineReducers({
    navbar
});
*/
var store = createStore(navbar);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    destination
);
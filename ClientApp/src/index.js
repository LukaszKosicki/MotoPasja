import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { createStore } from "redux";
import { combineReducers } from "redux";
import post from '../src/store/reducers/post';
import blog from '../src/store/reducers/blog';

var destination = document.querySelector('#root');

var combine = combineReducers({
    post, blog
});

function configureStore(state) {
    return createStore(combine, state);
}

var store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    destination
);
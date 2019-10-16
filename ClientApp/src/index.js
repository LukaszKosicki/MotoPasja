import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import post from '../src/store/reducers/post';
import blog from '../src/store/reducers/blog';
import thunk from "redux-thunk";
import { getUser } from './store/actions/loggedUser';
import { user } from "./store/reducers/loggedUser";
import { form } from "./store/reducers/loginRegisterForm";

var destination = document.querySelector('#root');

var combine = combineReducers({
    post, blog, user, form
});

function configureStore() {
    return createStore(combine,
        applyMiddleware(thunk));
}

var store = configureStore();

store.dispatch(getUser());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    destination
);
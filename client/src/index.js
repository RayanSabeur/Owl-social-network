import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import {applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { getAllUsers } from './actions/allUser.actions';
import { getPosts } from './actions/post.actions';


const store = createStore(
    rootReducer,
     composeWithDevTools(applyMiddleware(thunk))  
); 
store.dispatch(getAllUsers()); 
store.dispatch(getPosts());



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  
    <Provider store={store}>  
    <App />
    </Provider>,
 
);


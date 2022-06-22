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

//liste ficher lié a redux et son fonctionnement : reducer/index.js, user.reducer.js, cet onglet là, 


const store = createStore(
    rootReducer,
     composeWithDevTools(applyMiddleware(thunk)) //composeWithDevTools nous permet de travailler dans console du navigateur, thunk c une middleware pour faire des requete async avec redux
); //rootReducer c'est notre store, on va y stocker TOUS nos reducer, en appelant notre combine reduceur en tant que rootreducer
store.dispatch(getAllUsers()); //on vient de se faire un get de tous les user quand on lance l'appli
store.dispatch(getPosts());



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( // notre store qu'on met au plus haut de notre apk en entourant app <Provider store={store}> 
  
    <Provider store={store}>  
    <App />
    </Provider>,
 
);


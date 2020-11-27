import React from "react";
import { render } from "react-dom";
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './store/root-reducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';
import App from "./App";

const store = createStore(rootReducer, 
  compose(applyMiddleware(thunk.withExtraArgument({getFirestore, getFirebase})),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig)
  )
)

render(<Provider store={store}><App/></Provider>, document.getElementById("app"));
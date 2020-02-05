import thunk from "redux-thunk";
import {applyMiddleware, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from './reducers/root.reducer';
import {composeWithDevTools} from "redux-devtools-extension";
import {history} from "./utils/history";


import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
};

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));


export default function configureStore(preloadedState) {
    return createStore(
        persistedReducer, // root reducer with router state
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                thunk
            )
        )
    )
}


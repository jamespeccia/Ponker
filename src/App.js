import React from 'react';

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import configureStore from './store';

import {history} from "./utils/history";
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from "redux-persist";
import Loading from "./components/Loading/Loading";
import Routes from "./routes/routes"


const store = configureStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<Loading/>} persistor={persistStore(store)}>
                    <ConnectedRouter history={history}>
                        <Routes/>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;

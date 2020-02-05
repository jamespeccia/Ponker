import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router';

import {authentication} from "./authentication.reducer";
import {registration} from "./registration.reducer";
import {users} from "./user.reducer";

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    authentication, registration, users
});

export default createRootReducer;
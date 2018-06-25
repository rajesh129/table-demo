import {createStore, combineReducers, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import inputReducers from "./reducers/inputReducers";
// import user from "./reducers/userReducer";

export default createStore(
    inputReducers,
    {},
    applyMiddleware(createLogger(), thunk, promise())
);

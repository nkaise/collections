import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import themeReducer from './themeReducer';

const rootReducer = combineReducers( {
    user: userReducer,
    theme: themeReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
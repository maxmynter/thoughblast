import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thoughtReducer from "./reducers/thoughtReducer";
import tagReducer from "./reducers/tagReducer";

const rootReducer = combineReducers({ thoughtReducer, tagReducer });

const store = configureStore({ reducer: rootReducer });

export default store;

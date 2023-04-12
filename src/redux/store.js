import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thoughtReducer from "./reducers/thoughtReducer";

const rootReducer = combineReducers({ thoughtReducer });

const store = configureStore({ reducer: rootReducer });

export default store;

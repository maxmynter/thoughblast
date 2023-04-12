import { configureStore } from "@reduxjs/toolkit";
import thoughtReducer from "./reducers/thoughtReducer";

const store = configureStore({ reducer: thoughtReducer });

export default store;

import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "../reducer/rootReducer";

const store = configureStore({ reducer: rootRedcuer });

export default store;

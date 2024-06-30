import { combineReducers } from "redux";
import toastReducer from "./toast";

const rootReducer = combineReducers({
  toast: toastReducer,
});

export default rootReducer;

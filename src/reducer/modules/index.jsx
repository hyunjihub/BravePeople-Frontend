import { combineReducers } from "redux";
import login from "./login";
import counter from "./counter";

const rootReducer = combineReducers({
    counter,
    login
});

export default rootReducer;
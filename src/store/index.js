import { createStore, combineReducers, applyMiddleware } from "redux";
import modelReducer from "./modelReducer";
import stateReducers from "./stateReducers";
import RestMiddleWare from "../RestServices/RestMiddleWare";

const restMiddleware = RestMiddleWare();
export default createStore(combineReducers({modelData : modelReducer,stateData: stateReducers}),applyMiddleware(restMiddleware));

export {saveUser,deleteUser} from "./actionCreators";
import { combineReducers } from "redux";
import navReducer from "./navReducer";
import appReducer from "./appReducer";
const reducer = combineReducers({
  nav: navReducer,
  app: appReducer
});

const rootReducer = (state, action) => {
  return reducer(state, action);
};

export default rootReducer;

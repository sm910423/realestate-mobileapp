import { AppStackNavigator } from "../screens/AppStackNavigator";
import { NavigationActions } from "react-navigation";

let initNavState = AppStackNavigator.router.getStateForAction(
  NavigationActions.init()
);

export const navReducer = (state = initNavState, action) => {
  const nextState = AppStackNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export default navReducer;

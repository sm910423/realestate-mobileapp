import React, { Component } from "react";
import { connect } from "react-redux";
import { StackNavigator, TabNavigator, addNavigationHelpers } from "react-navigation";
import { StatusBar, View } from "react-native";
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

import SplashScreen from 'react-native-splash-screen';

import WalkThroughScreen from "./WalkThroughScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import MainScreen from "./MainScreen";

const AppStackNavigator = StackNavigator(
  {
    WalkThrough: {
      screen: WalkThroughScreen
    },
    Login: {
      screen: LoginScreen
    },
    Register: {
      screen: RegisterScreen
    },
    Forgot: {
      screen: ForgotPasswordScreen
    },
    App: {
      screen: MainScreen
    }
  },
  { initialRouteName: "WalkThrough" }
  // { initialRouteName: "App" }
);

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);
const addListener = createReduxBoundAddListener("root");

class AppWithNavigationState extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" />
        <AppStackNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
            addListener
          })}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps, null)(AppWithNavigationState);

export { AppStackNavigator };

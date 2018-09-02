import * as React from "react";
import { AppRegistry } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
// import { StackNavigator, TabNavigator } from "react-navigation";
import { Provider } from "react-redux";

// import LoginScreen from "./src/screens/LoginScreen";
// import RegisterScreen from "./src/screens/RegisterScreen";
// import ChatScreen from "./src/screens/ChatScreen";
import {
  ConversationsComponent,
  ContactScreen,
  GroupScreen
} from "./src/screens/MainScreen";
import configureStore from "./src/config/configureStore";
import AppWithNavigationState from "./src/screens/AppStackNavigator";
import { primaryColor, accentColor } from "./src/shared/styles";

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    accent: accentColor
  }
};

// Redux Store

const store = configureStore();

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppWithNavigationState />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent("YeomanApp", () => Main);

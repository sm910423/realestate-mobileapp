import React, { Component } from "react";
import { View, Text } from "react-native";
import HeaderComponent from "./../../Components/HeaderComponent";

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent text="Settings" />
      </View>
    );
  }
}

export default SettingsScreen;

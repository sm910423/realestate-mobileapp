import React, { Component } from "react";
import { View, Text } from "react-native";
import HeaderComponent from "./../../Components/HeaderComponent";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent text="Search" />
      </View>
    );
  }
}

export default SearchScreen;

import React, { Component } from "react";
import { Platform, View, TouchableOpacity } from "react-native";
import { Paper, Text, withTheme } from "react-native-paper";
import { sharedStyles, blueColor } from "../../shared/styles";
import styles from "./styles";
import ButtonComponent from "../../Components/ButtonComponent";

class WalkThroughScreen extends Component {
  static navigationOptions = {
    header: null
  };
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount = () => {
  };

  clickSignupButton = () => {
    this.props.navigation.navigate("Register");
  };

  clickLoginButton = () => {
    this.props.navigation.navigate("Login");
  };
  
  render() {
    return (
      <View style={[sharedStyles.container, sharedStyles.rowContainer, sharedStyles.flexOne]}>
        <Paper style={sharedStyles.paperContainer}>
          <View style={[ sharedStyles.centeredContent, styles.titleViewStyle ]}>
            <Text style={[ styles.titleTextStyle ]}>YEOMAN</Text>
          </View>
          <ButtonComponent text="Create an Account" onPress={this.clickSignupButton}></ButtonComponent>
          <View style={[sharedStyles.flexOne, sharedStyles.rowContainer, sharedStyles.centeredContent, sharedStyles.paperFooterText]}>
            {this.renderFooter()}
          </View>
        </Paper>
      </View>
    );
  }
  
  renderFooter = () => {
    if (Platform.OS === "ios") {
      return (
        <Text style={{ fontSize: 16 }}>
          Already on Yeoman?
          <TouchableOpacity onPress={this.clickLoginButton} style={[sharedStyles.footerButton]}>
            <Text style={[{ color: blueColor, fontSize: 16 }]}>Sign In</Text>
          </TouchableOpacity>
        </Text>
      );
    }
  };
}


export default withTheme(WalkThroughScreen);

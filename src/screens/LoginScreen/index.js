import React, { Component } from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  ToastAndroid,
  AlertIOS
} from "react-native";
import { Paper, Text, TextInput, Button, withTheme } from "react-native-paper";
import { connect } from "react-redux";

import { sharedStyles } from "../../shared/styles";
import * as Api from "../../config/api";
import { fetchContactsAction, loginAction } from "./../../store/actions";
class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  validCredentials = () => {
    return (
      this.state.email &&
      this.state.email.length > 0 &&
      this.state.password &&
      this.state.password.length > 0
    );
  };

  componentDidMount = () => {
    //this.props.login({ email: "izit.able@gmail.com", password: "pimba10" });
    //this.props.navigation.navigate("Main");
  };

  login = () => {
    if (this.validCredentials()) {
      this.setState({ loading: true });
      this.props.login({
        email: this.state.email,
        password: this.state.password
      });
    } else {
      this.alertUser("Please fill in all fields", "Error");
    }
  };

  alertUser = (message, iosTitle) => {
    if (Platform.OS === "ios") {
      AlertIOS.alert(iosTitle, message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  render() {
    const { colors } = this.props.theme;
    return (
      <View
        style={[
          sharedStyles.container,
          sharedStyles.columnContainer,
          sharedStyles.centeredContent,
          sharedStyles.flexOne
        ]}
      >
        <View style={sharedStyles.rowContainer}>
          <Paper style={sharedStyles.paperContainer}>
            <Text style={[{ color: colors.primary }, sharedStyles.title]}>
              Sign In
            </Text>
            <TextInput
              label="Email"
              value={this.state.email}
              placeholder="Email"
              onChangeText={text => this.setState({ email: text })}
            />
            <TextInput
              label="Password"
              value={this.state.password}
              placeholder="Password"
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry={true}
            />
            <Button
              raised
              dark
              color={colors.primary}
              style={[sharedStyles.roundedCorners]}
              onPress={this.login}
              loading={this.state.loading}
            >
              Log In
            </Button>
            <View
              style={[
                sharedStyles.flexOne,
                sharedStyles.rowContainer,
                sharedStyles.centeredContent,
                sharedStyles.paperFooterText
              ]}
            >
              {this.renderFooter()}
            </View>
          </Paper>
        </View>
      </View>
    );
  }

  renderFooter = () => {
    const { colors } = this.props.theme;
    if (Platform.OS === "ios") {
      return (
        <Text>
          Don't have an account?
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
            style={[sharedStyles.footerButton]}
          >
            <Text style={[{ color: colors.primary }]}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      );
    } else {
      return (
        <View style={[sharedStyles.rowContainer, sharedStyles.flexOne]}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={[{ color: colors.primary }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
}

const mapDispatchToProps = dispatch => ({
  login: loginData => {
    dispatch(loginAction(loginData));
  }
});

export default connect(null, mapDispatchToProps)(withTheme(LoginScreen));

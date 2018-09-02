import React, { Component } from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  AlertIOS,
  ToastAndroid
} from "react-native";
import { Paper, Text, TextInput, Button, withTheme } from "react-native-paper";

import { sharedStyles } from "../../shared/styles";
import * as Api from "../../config/api";

class RegisterScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false
    };
  }

  validCredentials = () => {
    return (
      this.state.name &&
      this.state.name.length > 0 &&
      this.state.email &&
      this.state.email.length > 0 &&
      this.state.password &&
      this.state.password.length > 0 &&
      this.state.confirmPassword &&
      this.state.confirmPassword.length > 0
    );
  };

  register = () => {
    if (this.validCredentials()) {
      this.setState({ loading: true });
      Api.register(
        this.state.name,
        this.state.email,
        this.state.password,
        this.state.confirmPassword
      )
        .then(values => {
          this.props.navigation.navigate("Login");
        })
        .catch(error => {
          this.alertUser("Error registering", "Error");
        })
        .then(() => this.setState({ loading: false }));
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
              Sign Up
            </Text>
            <TextInput
              label="Name"
              value={this.state.name}
              placeholder="Name"
              onChangeText={text => this.setState({ name: text })}
            />
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
            <TextInput
              label="Confirm Password"
              value={this.state.confirmPassword}
              placeholder="Confirm Password"
              onChangeText={text => this.setState({ confirmPassword: text })}
              secureTextEntry={true}
            />
            <Button
              raised
              dark
              color={colors.primary}
              style={[sharedStyles.roundedCorners]}
              onPress={this.register}
              loading={this.state.loading}
            >
              Register
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
          Already have an account?
          <TouchableOpacity
            style={sharedStyles.footerButton}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={[{ color: colors.primary }]}>Sign In</Text>
          </TouchableOpacity>
        </Text>
      );
    } else {
      return (
        <View style={[sharedStyles.rowContainer, sharedStyles.flexOne]}>
          <Text> Already have an account? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={[{ color: colors.primary }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
}

export default withTheme(RegisterScreen);

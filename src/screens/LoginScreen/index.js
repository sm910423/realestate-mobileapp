import React, { Component } from "react";
import { Platform, View, ScrollView, TouchableOpacity, } from "react-native";
import { Text, withTheme } from "react-native-paper";
import FacebookButtonComponent from "../../Components/FacebookButtonComponent";
import GoogleButtonComponent from "../../Components/GoogleButtonComponent";
import ButtonComponent from "../../Components/ButtonComponent";
import RoundTextInputComponent from "../../Components/RoundTextInputComponent";

import { connect } from "react-redux";

import { loginAction } from "./../../store/actions";

import { sharedStyles, blueColor } from "../../shared/styles";
import styles from "./styles";


class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  validCredentials = () => {
    return (
      this.state.email && this.state.email.length > 0 &&
      this.state.password && this.state.password.length > 0
    );
  };

  componentDidMount = () => {
    //this.props.login({ email: "izit.able@gmail.com", password: "pimba10" });
    //this.props.navigation.navigate("Main");
  };

  loginByEmail = () => {
    if (this.validCredentials()) {      
      this.props.login({ email: this.state.email, password: this.state.password, method: 'email' });

      // fb.fbEmailLogin(this.state.email, this.state.password, (result) => {
      //   if (result.status === 'success') {
      //     // result.data.user.email, .uid
      //     this.props.navigation.navigate("App");
      //   } else {
      //     this.setState({ loadingEmail: false });
      //     this.alertUser("Error", result.message);
      //   }
      // });
    }
  };

  loginByFacebook = () => {
    console.log("click facebook button");
    this.props.login({method: 'facebook'});
  }

  loginByGoogle = () => {
    console.log("click google button");
    this.props.login({method: 'google'});
  }

  render() {
    const { colors } = this.props.theme;
    return (
      <ScrollView style={[styles.container, sharedStyles.columnContainer, sharedStyles.flexOne]}>
        <View style={[sharedStyles.columnContainer, sharedStyles.paperContainer]}>
          <View style={[ sharedStyles.centeredContent, sharedStyles.titleViewStyle ]}>
            <Text style={[ sharedStyles.titleTextStyle ]}>YEOMAN</Text>
          </View>
          <View style={[ sharedStyles.centeredContent, styles.subTitleViewStyle ]}>
            <Text style={[ styles.subTitleTextStyle ]}>Sign in</Text>
          </View>

          <RoundTextInputComponent label="Email Address" value={this.state.email} placeholder="Email Address" onChangeText={text => this.setState({ email: text })} />
          <RoundTextInputComponent label="Password" value={this.state.password} placeholder="Password" secureTextEntry={true} onChangeText={text => this.setState({ password: text })} />

          <View style={sharedStyles.centeredContent}>
            <TouchableOpacity
              disabled={ this.props.loadingEmail || this.props.loadingGoogle || this.props.loadingFacebook }
              style={[{height: 24, width: 180, marginTop: 8}]}
              onPress={() => this.props.navigation.navigate("Forgot")}
            >
              <View style={[sharedStyles.centeredContent, {borderBottomWidth: 1, borderBottomColor: blueColor}]}>
                <Text style={{ color: blueColor, fontSize: 16 }}>Forgot your password?</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{height: 16}} />

          <ButtonComponent text="Sign In" onPress={this.loginByEmail.bind(this)} disabled={ this.props.loadingEmail || this.props.loadingGoogle || this.props.loadingFacebook } loading={this.props.loadingEmail} />
          <FacebookButtonComponent text="Connect with Facebook" onPress={this.loginByFacebook.bind(this)} disabled={ this.props.loadingEmail || this.props.loadingGoogle || this.props.loadingFacebook } loading={this.props.loadingFacebook} />
          <GoogleButtonComponent text="Connect with Google" onPress={this.loginByGoogle.bind(this)} disabled={ this.props.loadingEmail || this.props.loadingGoogle || this.props.loadingFacebook } loading={this.props.loadingGoogle} />

          <View style={[{height: 60, paddingTop: 8}, sharedStyles.rowContainer, sharedStyles.centeredContent, sharedStyles.paperFooterText]}>
            {this.renderFooter()}
          </View>
        </View>
      </ScrollView>
    );
  }

  renderFooter = () => {
    const { colors } = this.props.theme;
    if (Platform.OS === "ios") {
      return (
        <Text style={{ fontSize: 16 }}>
          Not on Yeoman?
          <TouchableOpacity
            disabled={ this.props.loadingEmail || this.props.loadingGoogle || this.props.loadingFacebook }
            style={sharedStyles.footerButton}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <View style={[sharedStyles.centeredContent, {borderBottomWidth: 1, borderBottomColor: blueColor}]}>
              <Text style={{ color: blueColor, fontSize: 16 }}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </Text>
      );
    } else {
    }
  };
}

const mapStateToProps = state => ({
  loadingEmail: state.app.loadingEmail,
  loadingGoogle: state.app.loadingGoogle,
  loadingFacebook: state.app.loadingFacebook
})

const mapDispatchToProps = dispatch => ({
  login: loginData => {
    dispatch(loginAction(loginData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(LoginScreen));

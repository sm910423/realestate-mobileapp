import React, { Component } from "react";
import { Platform, ScrollView, View, TouchableOpacity } from "react-native";
import { Text, withTheme } from "react-native-paper";
import FacebookButtonComponent from "../../Components/FacebookButtonComponent";
import GoogleButtonComponent from "../../Components/GoogleButtonComponent";
import ButtonComponent from "../../Components/ButtonComponent";
import RoundTextInputComponent from "../../Components/RoundTextInputComponent";

import { connect } from "react-redux";

import { signupAction } from "./../../store/actions";

import { sharedStyles, blueColor } from "../../shared/styles";
import styles from "./styles";


class RegisterScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
  }

  validCredentials = () => {
    return (
      this.state.firstname && this.state.firstname.length > 0 &&
      this.state.lastname && this.state.lastname.length > 0 &&
      this.state.email && this.state.email.length > 0 &&
      this.state.password && this.state.password.length > 0
    );
  };

  registerByEmail = () => {
    if (this.validCredentials()) {
      this.props.signup({ email: this.state.email, password: this.state.password, firstname: this.state.firstname, lastname: this.state.lastname, method: 'email' });
      // this.setState({ loadingEmail: true });

      // fb.fbEmailSignup(this.state.email, this.state.password, this.state.firstname, this.state.lastname, (result) => {
      //   if (result.status === 'success') {
      //     this.props.navigation.navigate("App");
      //   } else {
      //     this.setState({ loadingEmail: false });
      //     this.alertUser("Error", result.message);
      //   }
      // });
    }
  };

  registerByFacebook = () => {
    console.log("click facebook button");
    this.props.signup({method: 'facebook'});
  }

  registerByGoogle = () => {
    console.log("click google button");
    this.props.signup({method: 'google'});
  }

  render() {
    return (
      <ScrollView style={[styles.container, sharedStyles.columnContainer, sharedStyles.flexOne]}>
        <View style={[sharedStyles.columnContainer, sharedStyles.paperContainer]}>
          <View style={[ sharedStyles.centeredContent, sharedStyles.titleViewStyle ]}>
            <Text style={[ sharedStyles.titleTextStyle ]}>YEOMAN</Text>
          </View>
          <View style={[ sharedStyles.centeredContent, styles.subTitleViewStyle ]}>
            <Text style={[ styles.subTitleTextStyle ]}>Create new account</Text>
          </View>

          <RoundTextInputComponent label="First Name" value={this.state.firstname} placeholder="First Name" onChangeText={text => this.setState({ firstname: text })} />
          <RoundTextInputComponent label="Last Name" value={this.state.lastname} placeholder="Last Name" onChangeText={text => this.setState({ lastname: text })} />
          <RoundTextInputComponent label="Email" value={this.state.email} placeholder="Email" onChangeText={text => this.setState({ email: text })} />
          <RoundTextInputComponent label="Password" value={this.state.password} placeholder="Password" secureTextEntry={true} onChangeText={text => this.setState({ password: text })} />

          <View style={{height: 24}} />

          <ButtonComponent text="Sign Up" onPress={ this.registerByEmail.bind(this) } loading={ this.props.loadingEmail } disabled={ this.props.loadingEmail || this.props.loadingGoogle || this.props.loadingFacebook } />
          <FacebookButtonComponent text="Connect with Facebook" onPress={ this.registerByFacebook.bind(this) } loading={ this.props.loadingGoogle } disabled={ this.props.loadingEmail || this.props.loadingGoogle || this.props.loadingFacebook } />
          <GoogleButtonComponent text="Connect with Google" onPress={ this.registerByGoogle.bind(this) } loading={ this.props.loadingFacebook } disabled={ this.props.loadingEmail || this.props.loadingGoogle || this.props.loadingFacebook } />

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
          Already have an account?
          <TouchableOpacity
            disabled={ this.props.loadingEmail || this.props.loadingGoogle || this.props.loadingFacebook }
            style={sharedStyles.footerButton}
            onPress={() => this.props.navigation.navigate("Login")}
          >
          <View style={[sharedStyles.centeredContent, {borderBottomWidth: 1, borderBottomColor: blueColor}]}>
            <Text style={{ color: blueColor, fontSize: 16 }}>Sign In</Text>
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
  signup: signupData => {
    dispatch(signupAction(signupData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(RegisterScreen));

import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Text, withTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonComponent from "../../Components/ButtonComponent";
import RoundTextInputComponent from "../../Components/RoundTextInputComponent";
import { connect } from "react-redux";

import { sharedStyles } from "../../shared/styles";
import styles from "./styles";
import * as alert from "../../helpers/alert";

import { sendResetEmailAction } from "./../../store/actions";


class ForgotPasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: null,
      headerStyle: sharedStyles.toolbarStyle,
      headerLeft: (
        <Icon.Button
          name="arrow-left"
          style={[sharedStyles.toolbarButton]}
          size={24}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  validCredentials = () => {
    return (
      this.state.email && this.state.email.length > 0
    );
  };

  sendResetEmail = () => {
    if (this.validCredentials()) {
      this.props.sending({ email: this.state.email });
    } else {
      alert.showErrorMessage("Please fill in email field", "Error");
    }
  };

  /* verifyCode = () => {
  } */

  render() {
    return (
      <ScrollView style={[styles.container, sharedStyles.columnContainer, sharedStyles.flexOne]}>
        <View style={[sharedStyles.columnContainer, sharedStyles.paperContainer]}>
          <View style={[ sharedStyles.centeredContent, styles.subTitleViewStyle ]}>
            <Text style={[ styles.subTitleTextStyle ]}>Reset password</Text>
          </View>

          <RoundTextInputComponent label="Email Address" value={this.state.email} placeholder="Email Address" onChangeText={text => this.setState({ email: text })} />

          <View style={{height: 8}} />

          <ButtonComponent text="Send Email" onPress={this.sendResetEmail.bind(this)} loading={this.state.loading} />

          <View style={{height: 8}} />

          {/* <RoundTextInputComponent label="Verification Code" value={this.state.code} placeholder="Enter Verification Code" onChangeText={text => this.setState({ code: text })} />
          <RoundTextInputComponent label="New Password" value={this.state.password} placeholder="Enter New Password" onChangeText={text => this.setState({ password: text })} />
          <RoundTextInputComponent label="Confirm Password" value={this.state.confirm} placeholder="Confirm Password" onChangeText={text => this.setState({ confirm: text })} />

          <View style={{height: 8}} />

          <ButtonComponent text="Submit" onPress={this.verifyCode.bind(this)} loading={this.state.loading} />

          <View style={{height: 8}} /> */}
        </View>
      </ScrollView>
    );
  };
}

const mapStateToProps = state => ({
  loadingEmail: state.app.loadingCode,
})

const mapDispatchToProps = dispatch => ({
  sending: sendingData => {
    dispatch(sendResetEmailAction(sendingData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ForgotPasswordScreen));

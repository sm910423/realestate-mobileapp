import React, { Component } from "react";
import { View, Image } from "react-native";
import { Paper, Text } from "react-native-paper";
import { connect } from "react-redux";
import IconButtonComponent from "../../Components/IconButtonComponent";
import PrimaryHeaderComponent from "../../Components/PrimaryHeaderComponent";
import * as fb from "../../helpers/firebase";
import { fetchProfilesAction } from "./../../store/actions";
import { sharedStyles } from "../../shared/styles";
import styles from './style';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      firstname: "", lastname: "", fullname: "", email: "",
      picture: require("../../assets/images/account.png")
    };
  }

  componentWillMount() {
    fb.fbGetUserInfo(this.props.userid).then(result => {
      for (const key in result) {
        const user = result[key];
        const fullname = user.firstname + " " + user.lastname;
        this.setState({ firstname: user.firstname, lastname: user.lastname, email: user.email, fullname });
        
        if (user.picture) {
          const picture = {uri: user.picture};
          if (picture) {
            this.setState({ picture });
          }
        }
      }
    });
  }

  editProfile() {
  }

  render() {
    return (
      <View style={sharedStyles.flexOne}>
        <Paper style={[sharedStyles.paperContainer, styles.paperStyle]}>
          <PrimaryHeaderComponent title="Profile" buttonLabel="Edit" buttonOnPress={this.editProfile.bind(this)} />
          
          <View style={[ styles.userInfoContainer, sharedStyles.centeredContent ]}>
            <Image source={ this.state.picture } style={ styles.accountImageStyle } />
            <Text style={ styles.nameStyle }>{ this.state.fullname }</Text>
            <Text style={ styles.emailStyle }>{ this.state.email }</Text>
          </View>
          
          <View style={[ styles.buttonsContainer ]}>
            <View style={[ sharedStyles.rowContainer, sharedStyles.centeredContent, styles.buttonsRowContainer ]}>
              <View style={[ styles.buttonContainer ]}>
                <IconButtonComponent icon="account-card-details" text="Proof of Identity"></IconButtonComponent>
              </View>
              <View style={[ styles.buttonContainer ]}>
                <IconButtonComponent icon="file-document" text="Prequalification Letter"></IconButtonComponent>
              </View>
            </View>
            <View style={[ sharedStyles.rowContainer, sharedStyles.centeredContent, styles.buttonsRowContainer ]}>
              <View style={[ styles.buttonContainer ]}>
                <IconButtonComponent icon="wechat" text="Contact Us"></IconButtonComponent>
              </View>
              <View style={[ styles.buttonContainer ]}>
                <IconButtonComponent icon="settings-outline" text="Settings"></IconButtonComponent>
              </View>
            </View>
          </View>
        </Paper>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userid: state.app.userid
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProfiles: (page_number) => {
      dispatch(fetchProfilesAction(page_number));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

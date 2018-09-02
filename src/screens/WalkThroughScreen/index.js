import React, { Component } from "react";
import { Platform, View, TouchableOpacity, Image } from "react-native";
import { Paper, Text, withTheme } from "react-native-paper";
import { sharedStyles, blueColor } from "../../shared/styles";
import styles from "./styles";
import ButtonComponent from "../../Components/ButtonComponent";
import Swiper from 'react-native-swiper';

class WalkThroughScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    imgIntro01: require('./../../assets/images/intro01.png'),
    imgIntro02: require('./../../assets/images/intro02.png'),
    imgIntro03: require('./../../assets/images/intro03.png')
  }
  
  constructor(props) {
    super(props);
  }
  
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
          <View style={[ sharedStyles.centeredContent, sharedStyles.titleViewStyle ]}>
            <Text style={[ sharedStyles.titleTextStyle ]}>YEOMAN</Text>
          </View>
          <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
            <View style={styles.slide1}>
              <Image style={styles.image} source={this.state.imgIntro01} />
              <Text style={styles.text}>Add Your Dream Home.</Text>
            </View>
            <View style={styles.slide2}>
              <Image style={styles.image} source={this.state.imgIntro02} />
              <Text style={styles.text}>Visit Your Dream Home.</Text>
            </View>
            <View style={styles.slide3}>
              <Image style={styles.image} source={this.state.imgIntro03} />
              <Text style={styles.text}>Turn Dream Home Into Home.</Text>
            </View>
          </Swiper>
          <View style={{height: 28}}></View>
          <ButtonComponent text="Create an Account" onPress={this.clickSignupButton}></ButtonComponent>
          <View style={[{height: 60, paddingTop: 8}, sharedStyles.rowContainer, sharedStyles.centeredContent, sharedStyles.paperFooterText]}>
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
            <View style={[sharedStyles.centeredContent, {borderBottomWidth: 1, borderBottomColor: blueColor}]}>
              <Text style={{ color: blueColor, fontSize: 16 }}>Sign In</Text>
            </View>
          </TouchableOpacity>
        </Text>
      );
    }
  };
}


export default withTheme(WalkThroughScreen);

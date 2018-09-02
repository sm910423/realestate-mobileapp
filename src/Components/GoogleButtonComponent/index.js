import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import styles from "./styles";
import { sharedStyles } from "../../shared/styles";

const googleImage = require("./../../assets/images/google.png");

const GoogleButtonComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={ props.disabled } style={[styles.containerStyle, styles.shadowStyle,  sharedStyles.centeredContent]}>
      <View style={[sharedStyles.rowContainer, sharedStyles.flexOne, sharedStyles.centeredContent]}>
        <Text style={styles.textStyle}>{props.text}</Text>
        <Image style={styles.imageStyle} source={googleImage} />
      </View>
    </TouchableOpacity>
  );
};

export default GoogleButtonComponent;

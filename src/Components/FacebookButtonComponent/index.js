import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import styles from "./styles";
import { sharedStyles } from "../../shared/styles";

const facebookImage = require("./../../assets/images/facebook.png");

const FacebookButtonComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={ props.disabled } style={[styles.containerStyle, styles.shadowStyle,  sharedStyles.centeredContent]}>
      <View style={[sharedStyles.rowContainer, sharedStyles.flexOne, sharedStyles.centeredContent]}>
        <Text style={styles.textStyle}>{props.text}</Text>
        <Image style={styles.imageStyle} source={facebookImage} />
      </View>
    </TouchableOpacity>
  );
};

export default FacebookButtonComponent;

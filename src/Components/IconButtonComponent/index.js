import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import { sharedStyles } from "../../shared/styles";

const IconButtonComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={ props.disabled } style={[styles.containerStyle, styles.shadowStyle,  sharedStyles.centeredContent]}>
      <View style={[sharedStyles.flexOne, sharedStyles.centeredContent]}>
        <Icon name={props.icon} size={40} color="#000000" />
        <Text style={styles.textStyle}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IconButtonComponent;

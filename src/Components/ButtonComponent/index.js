import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from "./styles";
import { sharedStyles } from "../../shared/styles";

const ButtonComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.containerStyle, styles.shadowStyle,  sharedStyles.centeredContent]}>
      <Text style={styles.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

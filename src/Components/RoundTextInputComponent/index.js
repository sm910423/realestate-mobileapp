import React from 'react';
import { TextInput } from 'react-native';
import styles from "./styles";
import { sharedStyles } from "../../shared/styles";

const RoundTextInputComponent = (props) => {
  return (
    <TextInput style={[styles.containerStyle, sharedStyles.centeredContent]} label={props.label} value={props.value} placeholder={props.placeholder} secureTextEntry={props.secureTextEntry}
      onChangeText={props.onChangeText}
    />
  );
};

export default RoundTextInputComponent;

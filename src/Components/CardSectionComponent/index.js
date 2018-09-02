import React from 'react';
import { View } from 'react-native';
import styles from "./styles";

const CardSectionComponent = (props) => {
  return (
    <View style={styles.containerStyle}>{props.children}</View>
  );
};

export default CardSectionComponent;

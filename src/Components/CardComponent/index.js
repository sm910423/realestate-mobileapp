import React from 'react';
import { View } from 'react-native';
import styles from "./styles";

const CardComponent = (props) => {
  return (
    <View style={styles.containerStyle}>{props.children}</View>
  );
};

export default CardComponent;

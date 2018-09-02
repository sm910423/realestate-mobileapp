import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import CardComponent from './../CardComponent';
import CardSectionComponent from './../CardSectionComponent';
import styles from "./styles";

const AlbumDetailComponent = ({ album }) => {
  const { src, text, score } = album;
  const { 
    headerContentStyle,
    imageStyle
  } = styles;

  return (
    <CardComponent>
      <CardSectionComponent>
        <Image source={{ uri: src }} style={imageStyle} />
      </CardSectionComponent>

      <CardSectionComponent>
        <View style={headerContentStyle}>
          <Text>{text}</Text>
          <Text>{score}</Text>
        </View>
      </CardSectionComponent>
    </CardComponent>
  );
};

export default AlbumDetailComponent;

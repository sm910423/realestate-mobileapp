import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { withTheme } from "react-native-paper";
import { Gravatar, GravatarApi } from "react-native-gravatar";

import { sharedStyles } from "../../shared/styles";
import styles from "./styles";

const EmptyListComponent = props => {
  return (
    <View style={[sharedStyles.rowContainer, sharedStyles.flexOne]}>
      <Text style={[{ color: props.theme.colors.primary }, styles.title]}>
        Please select a contact from the side panel
      </Text>
    </View>
  );
};

export default withTheme(EmptyListComponent);

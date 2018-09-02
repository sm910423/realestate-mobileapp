import React, { Component } from "react";
import { ActivityIndicator, View, Text, ScrollView } from "react-native";
import { withTheme } from "react-native-paper";
import { Gravatar, GravatarApi } from "react-native-gravatar";

import { sharedStyles } from "../../shared/styles";
import styles from "./styles";

const HeaderComponent = props => {
  return props.isLoading ? (
    <View
      style={[
        sharedStyles.rowContainer,
        { height: 60 },
        styles.headerContainer,
        sharedStyles.centeredContent
      ]}
    >
      <ActivityIndicator size="small" color={props.theme.colors.primary} />
    </View>
  ) : (
    <View
      style={[
        sharedStyles.rowContainer,
        { height: 60, backgroundColor: props.theme.colors.primary },
        styles.headerContainer
      ]}
    >
      {/* <Gravatar
        options={{
          email: props.contact.email,
          parameters: { size: "180", d: "mm" },
          secure: true
        }}
        style={[styles.contactImage]}
      /> */}
      <Text
        style={[styles.contactTitle]}
      >
        {props.text}
      </Text>
    </View>
  );
};

export default withTheme(HeaderComponent);

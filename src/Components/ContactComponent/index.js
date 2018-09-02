import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { DrawerItem, withTheme, Checkbox, Divider } from "react-native-paper";
import { Gravatar, GravatarApi } from "react-native-gravatar";

import { getFirstLetter } from "./../../helpers";
import styles from "./styles";
import { sharedStyles } from "../../shared/styles";

const ContactComponent = props => {
  const { colors } = props.theme;
  return (
    <View>
      <View style={[sharedStyles.rowContainer, styles.container]}>
        <View>
          <Gravatar
            options={{
              email: props.contact.email,
              parameters: { size: "180", d: "mm" },
              secure: true
            }}
            style={{ borderRadius: 50 / 2 }}
          />
          {props.contact.members_json ? null : (
            <View
              style={[
                styles.presenceIndicator,
                props.contact.presence === "online"
                  ? styles.presenceOnline
                  : styles.presenceOffline
              ]}
            />
          )}
        </View>
        <DrawerItem
          style={sharedStyles.flexOne}
          active={props.active}
          label={
            props.contact.members_json
              ? `Group ${props.contact.name}`
              : props.contact.name
          }
          onPress={() => {
            if (props.selectable) {
              props.onPress(props.checked, props.contact);
            } else {
              props.onPress(props.contact);
            }
          }}
        />
        {props.selectable ? (
          <Checkbox
            checked={props.checked}
            onPress={() => props.onPress(props.checked, props.contact)}
          />
        ) : null}
      </View>
      <Divider style={sharedStyles.divider} />
    </View>
  );
};

export default withTheme(ContactComponent);

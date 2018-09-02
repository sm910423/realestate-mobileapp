import React, { Component } from "react";
import { ActivityIndicator, View, Text, ScrollView } from "react-native";
import { DrawerSection, withTheme } from "react-native-paper";
import ContactComponent from "./../ContactComponent";
import styles from "./styles";
import { sharedStyles } from "../../shared/styles";

class ContactList extends Component {
  render() {
    if (this.props.contacts) {
      return (
        <ScrollView style={styles.container}>
          <DrawerSection title="Contacts">
            <DrawerSection title="Online">
              {this.props.contacts.map(contact => {
                if (contact.presence === "online") {
                  return (
                    <ContactComponent
                      key={contact.id}
                      contact={contact}
                      onChangeContact={this.props.onChangeContact}
                      active={this.props.activeContact === contact}
                      selectable={false}
                    />
                  );
                }
              })}
            </DrawerSection>
            <DrawerSection title="Groups">
              {this.props.myGroups.map(group => {
                return (
                  <ContactComponent
                    key={group.id}
                    contact={group}
                    onChangeContact={this.props.onChangeContact}
                    selectable={false}
                  />
                );
              })}
            </DrawerSection>
            <DrawerSection title="Offline">
              {this.props.contacts.map(contact => {
                if (contact.presence === "offline") {
                  return (
                    <ContactComponent
                      active={this.props.activeContact === contact}
                      key={contact.id}
                      contact={contact}
                      onChangeContact={this.props.onChangeContact}
                      selectable={false}
                    />
                  );
                }
              })}
            </DrawerSection>
          </DrawerSection>
        </ScrollView>
      );
    } else {
      return (
        <View
          style={[
            styles.container,
            sharedStyles.flexOne,
            sharedStyles.centeredContent
          ]}
        >
          <ActivityIndicator
            size="large"
            color={this.props.theme.colors.primary}
          />
        </View>
      );
    }
  }
}

export default withTheme(ContactList);

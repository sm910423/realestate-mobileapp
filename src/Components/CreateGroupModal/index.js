import React, { Component } from "react";
import { Modal, View, Text, ScrollView } from "react-native";
import {
  withTheme,
  Button,
  Toolbar,
  ToolbarBackAction,
  ToolbarAction,
  ToolbarContent,
  FAB,
  SearchBar,
  Divider,
  TextInput
} from "react-native-paper";
import { Gravatar, GravatarApi } from "react-native-gravatar";

import ContactComponent from "../ContactComponent";
import { sharedStyles } from "../../shared/styles";
import styles from "./styles";

class CreateGroupModal extends Component {
  state = {
    query: "",
    selected: [],
    groupName: "",
    invalidGroupName: false
  };

  manageSelected = (remove, contact) => {
    if (remove) {
      const index = this.state.selected.indexOf(contact);
      if (index !== -1) {
        newSelected = [...this.state.selected];
        newSelected.splice(index, 1);
        this.setState({ selected: newSelected });
      }
    } else {
      newSelected = [...this.state.selected, contact];
      this.setState({ selected: newSelected });
    }
  };

  render() {
    const { colors } = this.props.theme;
    return (
      <Modal
        visible={this.props.visible}
        animationType={"slide"}
        transparent={true}
        onRequestClose={() => this.props.closeModal()}
      >
        <View style={[sharedStyles.flexOne, styles.contactsContainer]}>
          <Toolbar dark>
            <ToolbarBackAction onPress={() => this.props.closeModal()} />
            <ToolbarContent title="Create group" />
            <ToolbarAction
              icon="done"
              onPress={() => {
                if (this.state.groupName.length === 0) {
                  this.setState({ invalidGroupName: true });
                } else {
                  this.props.createGroup(
                    this.state.groupName,
                    this.state.selected.map(contact => contact.id)
                  );
                  this.props.closeModal();
                }
              }}
            />
          </Toolbar>
          <View style={styles.textInputView}>
            <TextInput
              label="Group name"
              value={this.state.groupName}
              onChangeText={groupName => this.setState({ groupName })}
            />
            {this.state.invalidGroupName ? (
              <Text style={styles.errorMessage}>Group name is required</Text>
            ) : null}
          </View>

          {/* <SearchBar
            style={{ margin: 0, padding: 0 }}
            placeholder="Search"
            onChangeText={query => {
              this.setState({ query });
            }}
            value={this.state.query}
          /> */}
          <ScrollView style={[sharedStyles.flexOne]}>
            {this.props.contacts.map(contact => {
              if (
                !contact.name ||
                contact.name.indexOf(this.state.query) !== -1
              ) {
                return (
                  <View key={contact.id}>
                    <ContactComponent
                      active={false}
                      contact={contact}
                      selectable={true}
                      onPress={this.manageSelected}
                      checked={this.state.selected.indexOf(contact) !== -1}
                    />
                    <Divider />
                  </View>
                );
              }
            })}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

export default withTheme(CreateGroupModal);

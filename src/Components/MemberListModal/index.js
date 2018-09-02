import React, { Component } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
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

class MemberListModal extends Component {
  state = {
    query: "",
    selected: []
  };

  manageSelected = (remove, id) => {
    if (remove) {
      const index = this.state.selected.indexOf(id);
      if (index !== -1) {
        newSelected = [...this.state.selected];
        newSelected.splice(index, 1);
        this.setState({ selected: newSelected });
      }
    } else {
      newSelected = [...this.state.selected, id];
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
        <View style={[styles.contactsContainer, styles.contactsList]}>
          <ScrollView>
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
                      selectable={false}
                      onPress={() => {}}
                    />
                    <Divider style={[sharedStyles.divider]} />
                  </View>
                );
              }
            })}
          </ScrollView>
          <TouchableOpacity
            style={[
              { height: 56, backgroundColor: "white" },
              sharedStyles.centeredContent
            ]}
            onPress={() => this.props.closeModal()}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default withTheme(MemberListModal);

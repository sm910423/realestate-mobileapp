import React, { Component } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
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

class ToolbarPopup extends Component {
  state = {
    query: "",
    selected: []
  };

  render() {
    const { colors } = this.props.theme;
    return (
      <Modal
        visible={this.props.visible}
        animationType={"fade"}
        transparent={true}
        onRequestClose={() => this.props.closePopup()}
      >
        <TouchableOpacity
          style={[sharedStyles.flexOne]}
          onPress={() => this.props.closePopup()}
        >
          <View style={styles.menuStyle}>
            {this.props.actions.map((action, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  sharedStyles.rowContainer,
                  sharedStyles.flexOne,
                  styles.itemStyle
                ]}
                onPress={() => {
                  this.props.closePopup();
                  if (action.onPress) {
                    action.onPress();
                  }
                }}
              >
                <View
                  style={[sharedStyles.flexOne, sharedStyles.centeredContent]}
                >
                  {i !== 0 ? (
                    <Divider style={{ backgroundColor: "lightgrey" }} />
                  ) : null}
                  <Text>{action.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default withTheme(ToolbarPopup);

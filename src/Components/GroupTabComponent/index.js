import React, { Component } from "react";
import { ActivityIndicator, View, ScrollView } from "react-native";
import { FAB, withTheme } from "react-native-paper";
import { connect } from "react-redux";

import ContactComponent from "./../ContactComponent";
import { navigateToChatScreenAction } from "../../store/actions";
import CreateGroupModal from "../CreateGroupModal";
import CFSocket from "../../helpers/CFSocket";
import { sharedStyles, primaryColor } from "../../shared/styles";

class GroupTabComponent extends Component {
  state = {
    modalOpen: false
  };
  navigateToChatScreen = contact => {
    this.props.navigateToChatScreen(contact);
  };

  createGroup = (groupName, contactIds) => {
    // TODO: Validate Fields
    if (groupName || contactIds.length > "") {
      // Create group
      CFSocket.groupSubs.createGroup(groupName, contactIds);
      this.closeModal();
      // Change room ID
    } else {
      // Erros a criar o grupo
    }
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { groups } = this.props;
    return this.props.isFetchingGroups ? (
      <View style={[sharedStyles.flexOne, sharedStyles.centeredContent]}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {groups.map(group => {
            return (
              <ContactComponent
                key={group.id}
                contact={group}
                onPress={this.navigateToChatScreen}
              />
            );
          })}
        </ScrollView>
        <FAB
          medium
          icon="add"
          onPress={() => {
            this.openModal();
          }}
          color="white"
          theme={this.props.theme}
          style={{
            position: "absolute",
            right: 16,
            bottom: 16
          }}
        />
        <CreateGroupModal
          visible={this.state.modalOpen}
          closeModal={this.closeModal}
          contacts={this.props.contacts}
          createGroup={this.createGroup}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.app.groups,
    contacts: state.app.contacts,
    isFetchingGroups: state.app.isFetchingGroups
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToChatScreen: contact => {
      dispatch(navigateToChatScreenAction(contact));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withTheme(GroupTabComponent)
);

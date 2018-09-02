import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Linking,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Actions, GiftedChat, MessageImage } from "react-native-gifted-chat";
import ActionCable from "react-native-actioncable";
import { Gravatar, GravatarApi } from "react-native-gravatar";
import { connect } from "react-redux";
import {
  Button,
  withTheme,
  Dialog,
  DialogTitle,
  DialogScrollArea,
  DialogActions,
  Divider,
  DialogContent
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";

import * as Api from "./../../config/api";
import * as helpers from "./../../helpers";
import { sharedStyles, primaryColor } from "./../../shared/styles";
import CFSocket from "../../helpers/CFSocket";
import ContactComponent from "./../../Components/ContactComponent";
import ToolbarPopupComponent from "../../Components/ToolbarPopupComponent";
import MemberListModal from "../../Components/MemberListModal";
import styles from "./styles";
import { navigateToGroupScreenAction } from "../../store/actions";

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: (
        <Text style={sharedStyles.toolbarTitle}>{params.contact.name}</Text>
      ),
      headerStyle: sharedStyles.toolbarStyle,
      headerLeft: (
        <Icon.Button
          name="arrow-left"
          style={[sharedStyles.toolbarButton]}
          size={30}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          {params.openPopup ? (
            <Icon.Button
              name="dots-vertical"
              size={30}
              style={[sharedStyles.toolbarButton]}
              onPress={() => {
                if (params && params.openPopup) {
                  params.openPopup();
                }
              }}
            />
          ) : null}
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state.activeContact = this.props.navigation.state.params.contact;
    if ("members_json" in this.state.activeContact) {
      this.props.navigation.setParams({ openPopup: this.openPopup });
    }
  }
  state = {
    isFetchingMessages: true,
    messages: [],
    roomId: undefined,
    showInviteDialog: false,
    showGroupMembers: false,
    selected: [],
    popupVisible: false,
    uploadingImage: false
  };

  /**
   * Hide members list
   */
  hideMembersList = () => {
    this.setState({ showGroupMembers: false });
  };

  /**
   * Show members list
   */
  showMembersList = () => {
    this.setState({ showGroupMembers: true });
  };

  _openInviteDialog = () => {
    this.setState({ showInviteDialog: true });
  };
  _closeInviteDialog = () => {
    this.setState({ showInviteDialog: false, selected: [] });
  };

  /**
   * Opens popup
   */
  openPopup = () => {
    this.setState({ popupVisible: true });
  };

  /**
   * Closes popup
   */
  closePopup = () => {
    this.setState({ popupVisible: false });
  };

  componentDidMount() {
    CFSocket.addMessagesToState = this.addMessagesToState;
    CFSocket.initializeMessageSubscription();

    const { activeContact } = this.state;
    if ("members_json" in activeContact) {
      // When its a group chat
      const messages = CFSocket.groupSubs.fetchMessages(activeContact.id);
      CFSocket.setRoomId(activeContact.id);
      this.setState({ isFetchingMessages: false, roomId: activeContact.id });
    } else {
      // When its a 1v1 chat
      Api.getMessages(this.state.activeContact.id).then(response => {
        messages = helpers.convertCableMessagesToGiftedMessages(response.data);
        this.setState({
          messages,
          isFetchingMessages: false,
          roomId: response.data.roomID
        });
        CFSocket.setRoomId(response.data.roomID);
      });
    }
  }

  onSend = messages => {
    CFSocket.subs.sendMessage(messages[0].text);
  };

  addMessagesToState = newMessages => {
    Array.prototype.push.apply(newMessages, this.state.messages);
    this.setState({
      messages: newMessages
    });
  };

  /*
  * Render Functions
  */

  /**
   * Renders Actions for message composer
   *
   *
   */
  renderActions = giftedMessages => {
    // Options to show on click of actions
    const options = {
      "Send Image": props => {
        DocumentPicker.show(
          {
            filetype: [DocumentPickerUtil.allFiles()]
          },
          (error, res) => {
            if (res) {
              this.setState({ uploadingImage: true });
              Api.uploadFile(this.state.roomId, "", res)
                .then(response => console.log(response))
                .catch(error => console.log(error))
                .then(() => this.setState({ uploadingImage: false }));
            }
          }
        );
      },
      Cancel: () => {}
    };
    if (this.state.uploadingImage) {
      return (
        <View style={{ alignSelf: "center", marginLeft: 12 }}>
          <ActivityIndicator size="small" color={primaryColor} />
        </View>
      );
    } else {
      // Return default actions for now
      return <Actions {...this.props} options={options} />;
    }
  };

  /**
   * Render messages with attachments
   * If image, renders default
   * Else renders an icon file that opens browser to download
   */
  renderAttachment = giftedMessages => {
    if (giftedMessages.currentMessage.contentType.indexOf("image") !== -1) {
      return <MessageImage currentMessage={giftedMessages.currentMessage} />;
    } else {
      return (
        <TouchableOpacity
          style={[
            sharedStyles.centeredContent,
            sharedStyles.rowContainer,
            styles.iconMessage
          ]}
          onPress={() => {
            Linking.canOpenURL(giftedMessages.currentMessage.image).then(
              supported => {
                if (supported) {
                  Linking.openURL(giftedMessages.currentMessage.image);
                }
              }
            );
          }}
        >
          <Icon name="attachment" size={30} color="#900" />
          <Text style={styles.attacthmentText} ellipsizeMode="middle">
            {giftedMessages.currentMessage.fileName}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  /**
   * Render avatar based on current contact
   */
  renderAvatar = giftedMessages => {
    // Find current contact
    const senderId = giftedMessages.currentMessage.user._id;
    const currentContact = this.props.contacts.find(
      cont => cont.id === senderId
    );

    if (currentContact) {
      return (
        <Gravatar
          options={{
            email: currentContact.email,
            parameters: { size: "180", d: "mm" },
            secure: true
          }}
          style={{ borderRadius: 50 / 2 }}
        />
      );
    } else {
      return null;
    }
  };

  renderGiftedChat() {
    const { isFetchingMessages, messages } = this.state;
    if (isFetchingMessages) {
      return (
        <View style={[sharedStyles.flexOne, sharedStyles.centeredContent]}>
          <ActivityIndicator
            size="large"
            color={this.props.theme.colors.primary}
          />
        </View>
      );
    } else {
      return (
        <GiftedChat
          messages={messages}
          onSend={messages => this.onSend(messages)}
          inverted={false}
          renderActions={this.renderActions}
          renderMessageImage={this.renderAttachment}
          renderAvatar={this.renderAvatar}
          user={{
            _id: this.props.user.id
          }}
        />
      );
    }
  }

  _getMembersThatDontBelongToGroup() {
    const { activeContact } = this.state;
    const { contacts } = this.props;
    if ("members_json" in activeContact) {
      memberList = JSON.parse(activeContact.members_json);
      const groupMembersIDs = memberList.map(member => member.id);
      const result = [];
      contacts.forEach(contact => {
        if (!groupMembersIDs.includes(contact.id)) {
          result.push(contact);
        }
      });
      return result;
    }
    return [];
  }

  componentWillUnmount() {
    CFSocket.subs && CFSocket.cable.subscriptions.remove(CFSocket.subs);
  }

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

  navigateToGroupScreen = () => {
    this.props.navigation.navigate("GroupScreen");
  };

  inviteMembers = () => {
    if (this.state.selected.length > 0) {
      CFSocket.groupSubs.inviteToGroup(
        this.state.selected.map(contact => contact.id)
      );
      const str = `${this.props.user.name} invited `;
      this.state.selected.forEach((contact, index) => {
        console.log(index);
        console.log(this.state.selected.length);
        if (index === this.state.selected.length - 1) {
          str += `${contact.name} to this group`;
        } else {
          str += `${contact.name}, `;
        }
      });
      const systemMessage = {
        _id: this.state.messages.length + 1000,
        text: str,
        system: true,
        createdAt: new Date()
      };
      this.addMessagesToState([systemMessage]);
    }

    this._closeInviteDialog();
  };

  _checkIfUserWantsToLeaveGroup = () => {
    Alert.alert("Leave Group", "Are you sure you want to leave this group?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Yes",
        onPress: () => {
          CFSocket.groupSubs.leaveGroup();
          this.props.navigation.navigate("App");
        }
      }
    ]);
  };

  render() {
    this._getMembersThatDontBelongToGroup();
    const child = this.renderGiftedChat();
    const { showInviteDialog } = this.state;
    const actions = [
      {
        text: "Group members",
        onPress: () => this.showMembersList()
      },
      {
        text: "Invite users",
        onPress: () => this._openInviteDialog()
      },
      {
        text: "Leave group",
        onPress: () => this._checkIfUserWantsToLeaveGroup()
      }
    ];

    return (
      <View style={sharedStyles.flexOne}>
        <ToolbarPopupComponent
          visible={this.state.popupVisible}
          closePopup={this.closePopup}
          actions={actions}
        />
        <MemberListModal
          visible={this.state.showGroupMembers}
          contacts={
            this.state.activeContact.members_json
              ? JSON.parse(this.state.activeContact.members_json)
              : []
          }
          closeModal={this.hideMembersList}
        />
        {child}
        <Dialog visible={showInviteDialog} onDismiss={this._closeInviteDialog}>
          <DialogTitle>Invite members</DialogTitle>
          <DialogScrollArea style={{ maxHeight: 450 }}>
            <ScrollView>
              {this._getMembersThatDontBelongToGroup().map(member => (
                <View key={member.id}>
                  <ContactComponent
                    active={false}
                    contact={member}
                    selectable={true}
                    onPress={this.manageSelected}
                    checked={this.state.selected.indexOf(member) !== -1}
                  />
                  <Divider />
                </View>
              ))}
            </ScrollView>
          </DialogScrollArea>
          <DialogActions>
            <Button color="lightgrey" onPress={() => this._closeInviteDialog()}>
              Cancel
            </Button>
            <Button primary onPress={() => this.inviteMembers()}>
              Invite
            </Button>
          </DialogActions>
        </Dialog>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    navigateToGroupScreen: () => {
      dispatch(navigateToGroupScreenAction());
    }
  };
};

const mapStateToProps = state => {
  return {
    contacts: state.app.contacts,
    accessToken: state.app.accessToken,
    client: state.app.client,
    user: state.app.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withTheme(ChatScreen)
);

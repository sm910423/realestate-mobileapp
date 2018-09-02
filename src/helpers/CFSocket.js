import ActionCable from "react-native-actioncable";

import * as helpers from "./../helpers";

class ChatFoundationSocket {
  cable = null;
  subs = null;
  groupSubs = null;
  roomId = null;
  addMessagesToState = undefined;

  createCableConnection(id, accessToken, client) {
    const websocketUrl = `ws://128.199.102.105:8080/cable?id=${id}&token=${accessToken}&client=${client}`;
    this.cable = ActionCable.createConsumer(websocketUrl);
  }

  setRoomId(roomId) {
    this.roomId = roomId;
  }

  initializeMessageSubscription() {
    const self = this;
    this.subs = this.cable.subscriptions.create("MessagingChannel", {
      connected: () => {
        console.log("CONNECTED MESSAGING CHANNEL");
      },
      received: data => {
        console.log(data);
        if (data.message.conversation_id === self.roomId) {
          //console.log(data);
          newMessages = helpers.convertCableMessagesToGiftedMessages({
            messages: [data.message]
          });
          self.addMessagesToState(newMessages);
        }
      },
      sendMessage(content) {
        this.perform("send_message", {
          content: content,
          room_id: self.roomId
        });
      }
    });
  }

  initGroupSubscription(saveGroups, updateGroups) {
    const self = this;
    this.groupSubs = this.cable.subscriptions.create("GroupChannel", {
      received(response) {
        self.handleResponse(response, saveGroups, updateGroups);
      },
      connected() {
        console.log("CONNECTED GROUP CHANNEL");
        this.perform("fetch_groups");
      },
      fetchMessages(roomId) {
        console.log("chamou");
        this.perform("fetch_messages", { roomId });
      },
      createGroup(name, contactIds) {
        this.perform("create_group", { name, contactIds });
      },
      inviteToGroup(contactIds) {
        this.perform("invite_to_group", { roomId: self.roomId, contactIds });
      },
      leaveGroup() {
        this.perform("leave_group", { roomId: self.roomId });
      }
    });
  }

  handleResponse = (response, saveGroups, updateGroups) => {
    switch (response.data.action) {
      case "LOAD_GROUPS":
        saveGroups(JSON.parse(response.data.groups));
        break;
      case "LOAD_GROUP_MESSAGES":
        const messages = helpers.convertCableMessagesToGiftedMessages(
          response.data
        );
        this.addMessagesToState(messages);
        break;
      case "GROUP_CREATED":
        updateGroups(JSON.parse(response.data.groups));
        break;
      case "LEAVE_GROUP":
        break;
      case "GROUP_UPDATED":
        updateGroups(JSON.parse(response.data.groups));
        break;
    }
  };
}

export default new ChatFoundationSocket();

import React, { Component } from "react";
import { ActivityIndicator, View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import ContactComponent from "./../../Components/ContactComponent";
import { navigateToChatScreenAction } from "./../../store/actions";
import { sharedStyles, primaryColor } from "../../shared/styles";

class ContactScreen extends Component {
  constructor(props) {
    super(props);
  }

  navigateToChatScreen = contact => {
    this.props.navigateToChatScreen(contact);
  };

  render() {
    return this.props.isFecthingContacts ? (
      <View style={[sharedStyles.flexOne, sharedStyles.centeredContent]}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    ) : (
      <ScrollView>
        {this.props.contacts.map(contact => {
          return (
            <ContactComponent
              key={contact.uid}
              contact={contact}
              onPress={this.navigateToChatScreen}
            />
          );
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.app.contacts,
    isFetchingContacts: state.app.isFetchingContacts
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchMessages: contact => {
      dispatch(fetchMessagesAction(contact));
    },
    navigateToChatScreen: contact => {
      dispatch(navigateToChatScreenAction(contact));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);

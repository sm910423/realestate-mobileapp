import React, { Component } from "react";
import { connect } from "react-redux";
import { withTheme } from "react-native-paper";
import { TabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// import {
//   fetchContactsAction,
//   saveGroupsAction,
//   updateGroupsAction
// } from "../../store/actions";
// import ContactScreen from "./../ContactScreen";
import HomeScreen from "./../HomeScreen";
import SearchScreen from "./../SearchScreen";
import SettingsScreen from "./../SettingsScreen";
import MessagesScreen from "./../MessagesScreen";
// import ContactComponent from "./../../Components/ContactComponent";
// import GroupTabComponent from "./../../Components/GroupTabComponent";
// import CFSocket from "./../../helpers/CFSocket";
import styles from "./styles";
import { sharedStyles, primaryColor, accentColor } from "../../shared/styles";

const MainTabNavigator = TabNavigator(
  {
    Explorer: {
      screen: HomeScreen
    },
    Search: {
      screen: SearchScreen
    },
    Messages: {
      screen: MessagesScreen
    },
    Settings: {
      screen: SettingsScreen
    }
    // Contacts: {
    //   screen: ContactScreen
    // },
    // GroupScreen: {
    //   screen: GroupTabComponent
    // }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "Explorer":
            iconName = `home${focused ? "" : "-outline"}`;
            break;
          case "Search":
            iconName = `magnify`;
            break;
          case "Messages":
            iconName = `wechat`;
            break;
          case "Settings":
            iconName = `settings`;
            break;
          // case "Conversations":
          //   iconName = `wechat`;
          //   break;
          // case "Contacts":
          //   iconName = `account${focused ? "" : "-outline"}`;
          //   break;
          // case "GroupScreen":
          //   iconName = `account-multiple${focused ? "" : "-outline"}`;
          //   break;
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: primaryColor
      },
      indicatorStyle: {
        backgroundColor: accentColor
      },
    },
    tabBarPosition: 'bottom'
  }
);

class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      header: null
    };
  };

  componentWillMount = () => {
    this.props.navigation.setParams({ colors: this.props.theme.colors });
  };

  componentDidMount = () => {
    // const { id, accessToken, client } = this.props;
    // this.props.fetchContacts();
    // CFSocket.createCableConnection(id, accessToken, client);
    // CFSocket.initGroupSubscription(
    //   this.props.saveGroups,
    //   this.props.updateGroups
    // );
  };

  render() {
    return <MainTabNavigator />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchContacts: () => {
    //   dispatch(fetchContactsAction());
    // },
    // saveGroups: groups => {
    //   dispatch(saveGroupsAction(groups));
    // },
    // updateGroups: groups => {
    //   dispatch(updateGroupsAction(groups));
    // }
  };
};

const mapStateToProps = state => {
  return {
    id: state.app.user.id,
    accessToken: state.app.accessToken,
    client: state.app.client
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withTheme(MainScreen)
);

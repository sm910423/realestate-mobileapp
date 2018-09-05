import React, { Component } from "react";
import { connect } from "react-redux";
import { withTheme } from "react-native-paper";
import { TabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropertiesScreen from '../PropertiesScreen';
import ProfileScreen from '../ProfileScreen';

import styles from "./styles";
import { sharedStyles, primaryColor, accentColor } from "../../shared/styles";

const MainTabNavigator = TabNavigator(
  {
    Properties: {
      screen: PropertiesScreen
    },
    Profile: {
      screen: ProfileScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "Properties":
            iconName = `home${focused ? "" : "-outline"}`;
            break;
          case "Profile":
            iconName = `account-circle`;
            break;
        }
        return <Icon name={iconName} size={26} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: primaryColor,
      labelStyle: styles.tabBarLabelStyle,
      style: styles.tabBarStyle
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

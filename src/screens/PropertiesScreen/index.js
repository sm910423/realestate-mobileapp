import React, { Component } from "react";
import { ActivityIndicator, View, Text, ScrollView, RefreshControl } from "react-native";
import { connect } from "react-redux";
import AlbumDetailComponent from "./../../Components/AlbumDetailComponent";
import HeaderComponent from "./../../Components/HeaderComponent";
import { fetchProfilesAction } from "./../../store/actions";
import { sharedStyles, primaryColor } from "../../shared/styles";
import InfiniteScroll from 'react-native-infinite-scroll';
import styles from './style';

class PropertiesScreen extends Component {
  isLoading = false;

  constructor(props) {
    super(props);

    this.state = { 
      page_number: 0, total_profiles: [], refreshing: false
    };
  }
  
  loadMorePage() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.setState({page_number: this.state.page_number + 1}, () => {
        this.props.fetchProfiles(this.state.page_number);
      });
    }
  }

  refreshPage() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.setState({page_number: 0, total_profiles: [], refreshing: true}, () => {
        this.props.fetchProfiles(this.state.page_number);
      });
    }
  }
  
  componentWillReceiveProps(n) {
    this.isLoading = false;
    arr = this.state.total_profiles;
    var array = Object.keys(n.profiles).map(function (key) { return n.profiles[key]; });
    array.forEach(element => {
      arr.push(element);
    });
    this.setState({ total_profiles: arr, refreshing: false });
  }

  componentWillMount(){
    this.props.fetchProfiles(this.state.page_number);
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <HeaderComponent text="Explorer" />
          <InfiniteScroll
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refreshPage.bind(this)}
              />
            }
            horizontal={false}  //true - if you want in horizontal
            onLoadMoreAsync={this.loadMorePage.bind(this)}
            distanceFromEnd={0} // distance in density-independent pixels from the right end
            style={{flex: 1}}
          >
            {this.renderList()}
          </InfiniteScroll>
          {this.renderLoadingIcon()}
        </View>
      );
  }
  
  renderList() {
    // if (this.props.profiles && this.props.profiles.length > 0) {
      console.log("profile---", this.props.profiles);
      return this.state.total_profiles.map(profile => {
        return <AlbumDetailComponent key={profile.id} album={profile} />
      });
    // }
  }

  renderLoadingIcon() {
    if (this.props.isFetchingProfiles) {
      return (
        <ActivityIndicator size="large" color={primaryColor} />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    profiles: state.app.profiles,
    isFetchingProfiles: state.app.isFetchingProfiles
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProfiles: (page_number) => {
      dispatch(fetchProfilesAction(page_number));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesScreen);

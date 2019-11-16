import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Animated
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import ListComponent from "../components/ListComponent";
import { Container, Content, List } from "native-base";
import { withCollapsibleForTabChild } from "react-navigation-collapsible";
import firebase from "firebase";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MyChannelContentListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: []
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-list-box" style={{ color: tintColor }} />
    )
  };

  async componentDidMount() {
    await this._fetchData();
  }

  _fetchData = () => {
    var user = firebase.auth().currentUser;
    var data = {
      email: user.email
    };

    fetch("http://34.82.57.148:8080/react_native_content_select", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(resData => this.setState({ fetchData: resData }))
      .catch(error => console.log(error));
  };

  renderItem = ({ item }) => (
    <ListComponent
      title={item.title}
      upload_image={item.main_img_url}
      description={item.content}
    />
  );

  render() {
    const { animatedY, onScroll } = this.props.collapsible;

    return (
      <AnimatedFlatList
        style={{ flex: 1 }}
        data={this.state.fetchData}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => String(index)}
        onScroll={onScroll}
        _mustAddThis={animatedY}
      />
    );
  }
}

export default withCollapsibleForTabChild(MyChannelContentListScreen);

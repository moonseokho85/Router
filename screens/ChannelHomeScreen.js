import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Animated
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import CardComponent from "../components/CardComponent";
import { Content, Container } from "native-base";

import {
  Card,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Right,
  Button
} from "native-base";

import firebase from "firebase";

import { withCollapsibleForTabChild } from "react-navigation-collapsible";
import SubscriptionButton from "../components/SubscriptionButton";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class ChannelHomeScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-home" style={{ color: tintColor }} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fetchData: []
    };
  }

  async componentDidMount() {
    await this._fetchData();
  }

  _fetchData = async () => {
    var data = {
      email: this.props.screenProps.navigation.state.params.email
    };

    await fetch("http://34.82.57.148:8080/react_native_content_select", {
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

  renderItem = ({ item, i }) => (
    <CardComponent
      key={i}
      profile_image_url={item.profile_url}
      title={item.title}
      // firstname = {this.state.firstname}
      // lastname = {this.state.lastname}
      upload_image={item.image_file}
      description={item.contents}
      email={item.id}
      title_no={item.title_no}
      de_menu={item.de_menu}
      up_text={item.up_text}
      down_text={item.down_text}
      onPressContent={() => {
        this.props.navigation.navigate("Detail", {
          email: item.id,
          firstname: item.firstname,
          lastname: item.lastname,
          nickname: item.nickname,
          profile_image_url: item.profile_url,
          title: item.title,
          upload_image: item.upload_image,
          description: item.description,
          nickname: item.nickname,
          home_top_image: item.home_top_image,
          content: item.content
        });
      }}
      onPressReply={() => {
        this.props.navigation.navigate("Reply");
      }}
    />
  );

  _listHeaderComponent = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          height: 100
        }}
      >
        <SubscriptionButton fetchData={this.state.fetchData} />
      </View>
    );
  };

  _listFooterComponent = () => {
    return (
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#fff",
            alignItems: "center",
            borderRadius: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: "grey",
            width: "100%"
          }}
        >
          <Text style={{ fontSize: 16, color: "grey", fontWeight: "bold" }}>
            더 보기
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { animatedY, onScroll } = this.props.collapsible; // console.log(this.props)
    // console.log("---fetchdata.follow---", this.state.fetchData[0].follow);

    return (
      <AnimatedFlatList
        style={{ flex: 1 }}
        data={this.state.fetchData}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => String(index)}
        onScroll={onScroll}
        _mustAddThis={animatedY}
        ListHeaderComponent={() => {
          return <SubscriptionButton fetchData={this.state.fetchData} />;
        }}
        ListFooterComponent={this._listFooterComponent}
      />
    );
  }
}

export default withCollapsibleForTabChild(ChannelHomeScreen);

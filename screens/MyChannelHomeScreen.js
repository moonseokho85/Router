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
import firebase from "firebase";
import { withCollapsibleForTabChild } from "react-navigation-collapsible";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MyChannelHomeScreen extends Component {
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
    var user = firebase.auth().currentUser;

    var data = {
      email: user.email
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

  renderItem = ({ item }) => (
    <CardComponent
      profile_image_url={item.profile_url}
      title={item.title}
      upload_image={item.image_file}
      description={item.contents}
      email={item.id}
      nickname={item.nickname}
      title_no={item.title_no}
      de_menu={item.de_menu}
      up_text={item.up_text}
      down_text={item.down_text}
      main_reple={item.main_reple}
      main_reple_nickname={item.main_reple_nickname}
      reple_count={item.reple_count}
      onPressContent={() => {
        this.props.navigation.navigate("Detail", {
          email: item.id,
          firstname: item.firstname,
          lastname: item.lastname,
          nickname: item.nickname,
          profile_image_url: item.profile_url,
          title: item.title,
          upload_image: item.image_file,
          description: item.description,
          nickname: item.nickname,
          home_top_image: item.main_image_url,
          content: item.contents
        });
      }}
      onPressReply={() => {
        this.props.navigation.navigate("Reply", {
          email: item.id,
          title_no: item.title_no,
          de_menu: item.de_menu
        });
      }}
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

export default withCollapsibleForTabChild(MyChannelHomeScreen);

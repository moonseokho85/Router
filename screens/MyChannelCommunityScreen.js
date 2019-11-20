import React, { Component } from "react";
import { Text, StyleSheet, View, Animated, FlatList } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { withCollapsibleForTabChild } from "react-navigation-collapsible";
import CommunityCardComponent from "../components/CommunityCardComponent";
import firebase from "firebase";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Appbar,
  IconButton
} from "react-native-paper";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MyChannelCommunityScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-people" style={{ color: tintColor }} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      mockData: [
        {
          title: "공지사항1",
          description: "공지사항1입니다.",
          image: ["https://t1.daumcdn.net/cfile/tistory/99A7CC3E5B069D3624"]
        },
        {
          title: "공지사항2",
          description: "공지사항2입니다.",
          image: ["https://t1.daumcdn.net/cfile/tistory/99A7CC3E5B069D3624"]
        },
        {
          title: "공지사항3",
          description: "공지사항3입니다.",
          image: ["https://t1.daumcdn.net/cfile/tistory/99A7CC3E5B069D3624"]
        },
        {
          title: "공지사항4",
          description: "공지사항4입니다.",
          image: ["https://t1.daumcdn.net/cfile/tistory/99A7CC3E5B069D3624"]
        }
      ],
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

  _ListHeaderComponent = () => {
    var user = firebase.auth().currentUser;
    return (
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <Card
          onPress={() => {
            this.props.navigation.navigate("CreatorRequest", {
              email: user.email,
              profile_image_url: user.photoURL
            });
          }}
        >
          <Card.Title
            title="글쓰기"
            left={props => (
              <Icon {...props} name="md-add-circle" color="orange" />
            )}
          />
        </Card>
      </View>
    );
  };

  renderItem = ({ item }) => {
    var user = firebase.auth().currentUser;
    return (
      <CommunityCardComponent
        // onPressThumnail={}
        profile_image_url={user.photoURL}
        nickname={user.displayName}
        // onPressContent={}
        title={item.title}
        description={item.description}
        upload_image={item.image}
      />
    );
  };

  render() {
    const { animatedY, onScroll } = this.props.collapsible;
    return (
      <AnimatedFlatList
        style={{ flex: 1 }}
        data={this.state.mockData}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => String(index)}
        onScroll={onScroll}
        _mustAddThis={animatedY}
        ListHeaderComponent={this._ListHeaderComponent}
      />
    );
  }
}

export default withCollapsibleForTabChild(MyChannelCommunityScreen);

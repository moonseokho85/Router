import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

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

export default class ChannelHomeScreen extends Component {
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
    const sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    await sleep(100).then(() => {
      this._fetchData();
    });

    // const splitedImageData = this.state.fetchData.imge_url;
    // await sleep(10000).then(console.log("---test---", splitedImageData));

    // await sleep(200).then(console.log("--test--", this.state.fetchData));
  }

  _fetchData = async () => {
    var data = {
      email: this.props.screenProps.email
    };

    await fetch("http://192.168.0.160:8080/react_native_content_select", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      // .then(resjson => console.log("-------------", resjson))
      .then(resData => this.setState({ fetchData: resData }))
      .catch(error => console.log(error));

    await console.log("---confirming state---", this.state.fetchData);
  };

  render() {
    var user = firebase.auth().currentUser;

    console.log("---fetchData---", this.state.fetchData);

    return (
      <Container>
        <Content>
          {this.state.fetchData.map((Data, i) => {
            return (
              <CardComponent
                key={i}
                profile_image_url={user.photoURL}
                title={Data.title}
                // firstname = {this.state.firstname}
                // lastname = {this.state.lastname}
                upload_image={Data.image_url}
                description={Data.content}
                // nickname = {this.state.nickname}
                onPressReply={() => {
                  this.props.navigation.navigate("Reply");
                }}
              />
              // </TouchableOpacity>
            );
          })}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  }
});

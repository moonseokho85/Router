import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput, Dimensions } from "react-native";
import firebase from "firebase";
import { Thumbnail } from "native-base";
import { TouchableHighlight } from "react-native-gesture-handler";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import ImageBrowser from "../components/ImageBrowser";

export default class MyInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      photos: [],

      fetchData: [],
      revisedData: [
        {
          profile_url: "",
          nickname: "",
          자기소개: ""
        }
      ]
    };
  }

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile = () => {
    var user = firebase.auth().currentUser;
    fetch("http://34.82.57.148:8080/react_native_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ email: user.email })
    })
      .then(res => res.json())
      .then(resData => this.setState({ fetchData: resData }))
      .catch(error => console.log(error));
  };

  openBrowser = () => {
    this.setState({ imageBrowserOpen: true });
  };

  imageBrowserCallback = callback => {
    callback
      .then(photos => {
        console.log(photos);
        this.setState({
          imageBrowserOpen: false,
          photos
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    if (this.state.imageBrowserOpen) {
      return <ImageBrowser max={10} callback={this.imageBrowserCallback} />;
    }
    var user = firebase.auth().currentUser;
    console.log("---fetchData---", this.state.fetchData);
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.openBrowser}>
          <Thumbnail
            large
            square
            //   source={{ uri: this.state.fetchData.profile_url }}
            source={{ uri: user.photoURL }}
            style={{ marginBottom: 10 }}
          />
        </TouchableHighlight>
        <Text style={{ marginBottom: 10 }}>
          이름 : {this.state.fetchData.name}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          이메일 : {this.state.fetchData.id}
        </Text>
        <TextInput
          style={{
            height: 40,
            width: Dimensions.get("window").width - 20,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10
          }}
          onChangeText={text => this.setState({ nickname: text })}
          placeholder={this.state.fetchData.nickname}
        />
        <TextInput
          style={{
            height: 40,
            width: Dimensions.get("window").width - 20,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10
          }}
          onChangeText={text => this.setState({ 자기소개: text })}
          placeholder={"자기소개"}
        />
        <TouchableHighlight>
          <View
            style={{
              backgroundColor: "orange",
              height: 40,
              width: Dimensions.get("window").width - 20,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>수정하기</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

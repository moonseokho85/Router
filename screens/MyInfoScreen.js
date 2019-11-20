import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import firebase from "firebase";
import { Thumbnail } from "native-base";
import { TouchableHighlight } from "react-native-gesture-handler";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import ImageBrowser from "../components/ImageBrowser";
import { RNS3 } from "react-native-s3-upload";
import { RNS3_ACCESS_KEY, RNS3_SECRET_KEY } from "react-native-dotenv";

export default class MyInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      photos: [],

      fetchData: [],

      profile_url: null,
      nickname: null,
      introduce: null
    };
  }

  async componentDidMount() {
    await this.fetchProfile();
    await console.log("---fetchData---", this.state.fetchData);
  }

  fetchProfile = async () => {
    var user = firebase.auth().currentUser;
    await fetch("http://34.82.57.148:8080/react_native_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ email: user.email })
    })
      .then(res => res.json())
      .then(resData =>
        this.setState({ fetchData: resData, profile_url: resData.profile_url })
      )
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
        this._convertPhoto(photos[0].uri);
      })
      .catch(e => console.log(e));
  };

  _convertPhoto = uri => {
    var user = firebase.auth().currentUser;

    RNS3.put(
      {
        // `uri` can also be a file system path (i.e. file://)
        uri: uri,
        name: `${Date.now()}.${user.email}.image`,
        type: "image/jpg"
      },
      {
        keyPrefix: "content_img/",
        bucket: "file-image",
        region: "ap-northeast-2",
        accessKey: RNS3_ACCESS_KEY,
        secretKey: RNS3_SECRET_KEY,
        successActionStatus: 201
      }
    ).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");

      console.log(
        "--- RESPONSE.BODY.POSTRESPONSE.LOCATION ---",
        response.body.postResponse.location
      );
      this.setState({ profile_url: response.body.postResponse.location });
      console.log("--------------------", this.state.profile_url);
    });
  };

  render() {
    if (this.state.imageBrowserOpen) {
      return <ImageBrowser max={10} callback={this.imageBrowserCallback} />;
    }
    var user = firebase.auth().currentUser;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableHighlight onPress={this.openBrowser}>
          <Thumbnail
            large
            square
            source={{ uri: this.state.profile_url }}
            style={{ marginBottom: 10, borderRadius: 10 }}
          />
        </TouchableHighlight>
        <Text style={{ marginBottom: 10 }}>
          이름 : {this.state.fetchData.name}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          이메일 : {this.state.fetchData.id}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>닉네임 : </Text>
          <TextInput
            style={{
              height: 40,
              width: Dimensions.get("window").width - 100,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              textAlign: "center"
            }}
            onChangeText={text => this.setState({ nickname: text })}
            placeholder={this.state.fetchData.nickname}
          />
        </View>
        <TextInput
          style={{
            height: 40,
            width: Dimensions.get("window").width - 20,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            textAlign: "center"
          }}
          onChangeText={text => this.setState({ introduce: text })}
          placeholder={"자기소개"}
        />
        <TouchableHighlight
          onPress={() => {
            fetch("http://192.168.0.160:8080/react_native_profile_edit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                email: user.email,
                profile_url: this.state.profile_url,
                nickname: this.state.nickname,
                introduce: this.state.introduce
              })
            });
            this.props.navigation.dismiss();
          }}
        >
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
      </KeyboardAvoidingView>
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

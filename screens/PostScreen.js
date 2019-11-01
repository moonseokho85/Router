import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  Dimensions,
  Picker
} from "react-native";

import firebase from "firebase";

import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { RNS3 } from "react-native-s3-upload";

import MapView from "react-native-maps";

// import { ImageBrowser } from 'expo-multiple-media-imagepicker';

import ImageBrowser from "../components/ImageBrowser";

export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      title: "",
      image: null,
      // convertedImg: "",
      description: "",
      address: "",
      region: null,
      imageBrowserOpen: false,
      photos: [],
      convertedPhotos: [],
      menu: [],
      selectedCategory: ""
    };
  }

  componentDidMount() {
    this.setState({
      address: this.props.navigation.getParam("address"),
      lat: this.props.navigation.getParam("lat"),
      lng: this.props.navigation.getParam("lng"),
      imageBrowserOpen: false
    });
  }

  _fetchCategory = () => {
    fetch("");
  };

  _Post = () => {
    this._convertUri();

    var user = firebase.auth().currentUser;

    const data = {
      email: user.email,
      title: this.state.title,
      // photos: this.state.photos,
      convertedPhotos: this.state.convertedPhotos,
      image: this.state.image,
      // convertedImg: this.state.convertedImg,
      description: this.state.description,
      latitude: this.props.navigation.getParam("lat"),
      longitude: this.props.navigation.getParam("lng")
    };

    console.log("--------confirm--------", data);

    setTimeout(() => {
      fetch("http://192.168.0.160:8080/react_native_content_save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(resData => console.log(resData))
        .then(() => this.props.navigation.dismiss())
        .catch(error => console.log(error));
    }, 3000);
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });
    console.log(result);

    if (!result.cancelled) {
      this.setState({
        image: result.uri
      });
    }
  };

  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        image: result.uri
      });
    }
  };

  _convertUri = async () => {
    {
      this.state.photos.map((Data, i) => {
        const user = firebase.auth().currentUser;

        RNS3.put(
          {
            // `uri` can also be a file system path (i.e. file://)
            uri: Data.file,
            name: `${Date.now()}.${user.email}.${this.state.title}.image`,
            type: "image/jpg"
          },
          {
            keyPrefix: "blog_image/",
            bucket: "tripco-imagefile",
            region: "ap-northeast-2",
            accessKey: "AKIAJQ5TEPLAO226FD7A",
            secretKey: "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",
            successActionStatus: 201
          }
        ).then(response => {
          if (response.status !== 201)
            throw new Error("Failed to upload image to S3");

          console.log(response.body.postResponse.location);
          this.state.convertedPhotos.push(response.body.postResponse.location);
          console.log("--------------------", this.state.convertedPhotos);
        });
      });
    }
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

  renderImage(item, i) {
    return (
      <Image
        style={{ height: 200, width: 200 }}
        source={{ uri: item.file }}
        key={i}
      />
    );
  }

  openBrowser = () => {
    this.setState({ imageBrowserOpen: true });
  };

  render() {
    if (this.state.imageBrowserOpen) {
      return <ImageBrowser max={10} callback={this.imageBrowserCallback} />;
    }

    let { image } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Picker
            selectedValue={this.state.selectedCategory}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ selectedCategory: itemValue })
            }
          >
            <Picker.Item label="Java" value="java" />
          </Picker>

          <TextInput
            style={{
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              width: Dimensions.get("window").width - 10
            }}
            onChangeText={title => {
              this.setState({
                title
              });
            }}
            placeholder={"제목"}
            // autoFocus
          />
          {image && (
            <Image
              source={{
                uri: this.state.image
              }}
              style={{
                width: null,
                height: 200
              }}
            />
          )}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            {this.state.photos.map((item, i) => this.renderImage(item, i))}
          </ScrollView>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                margin: 10
              }}
            >
              <TouchableOpacity onPress={this._takePhoto}>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: "orange",
                    height: 40,
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: "white"
                    }}
                  >
                    사진찍기
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                margin: 10
              }}
            >
              <TouchableOpacity onPress={this.openBrowser}>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: "orange",
                    height: 40,
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: "white"
                    }}
                  >
                    사진 고르기
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            style={{
              height: 300,
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              width: Dimensions.get("window").width - 10
            }}
            multiline={true}
            onChangeText={description => {
              this.setState({
                description
              });
            }}
            placeholder={"내용"}
            // autoFocus
          />
          <View style={{ margin: 10 }}>
            <MapView
              initialRegion={{
                latitude: this.props.navigation.getParam("lat"),
                longitude: this.props.navigation.getParam("lng"),
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
              }}
              showsUserLocation={true}
              style={{
                width: Dimensions.get("window").width - 10,
                height: 200
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: this.props.navigation.getParam("lat"),
                  longitude: this.props.navigation.getParam("lng")
                }}
                title={"title"}
                description={"description"}
                draggable
              />
            </MapView>
            <Text style={{ fontWeight: "bold" }}>
              주소: {this.state.address}
            </Text>
          </View>
          <View
            style={{
              margin: 10
            }}
          >
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "확인",
                  "정말로 업로드 하시겠습니까?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    {
                      text: "OK",
                      onPress: () => this._Post()
                    }
                  ],
                  {
                    cancelable: false
                  }
                )
              }
            >
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "orange",
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  width: Dimensions.get("window").width - 10
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "white"
                  }}
                >
                  업로드
                </Text>
              </View>
            </TouchableOpacity>
            {/* <Button
              title="업로드"
              onPress={() =>
                Alert.alert(
                  "확인",
                  "정말로 업로드 하시겠습니까?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    {
                      text: "OK",
                      onPress: () => this._Post()
                    }
                  ],
                  {
                    cancelable: false
                  }
                )
              }
            /> */}
          </View>
        </View>
      </ScrollView>
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

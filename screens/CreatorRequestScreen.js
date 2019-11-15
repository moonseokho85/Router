import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Thumbnail } from "native-base";
import firebase from "firebase";

export default class CreatorRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      money: 0,
      focused: false
    };
  }
  render() {
    var user = firebase.auth().currentUser;
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ margin: 5 }}>
            <Thumbnail
              square
              large
              source={{
                uri: user.photoURL
              }}
              style={{
                borderRadius: 10
              }}
            />
          </View>
          <View style={{ margin: 5 }}>
            <Ionicons name="md-arrow-round-forward" size={45} color="orange" />
          </View>
          <View style={{ margin: 5 }}>
            <Thumbnail
              square
              large
              source={{
                uri: this.props.navigation.getParam("profile_image_url")
              }}
              style={{
                borderRadius: 10
              }}
            />
          </View>
        </View>
        <View>
          <Text>{this.props.navigation.getParam("email")}</Text>
        </View>
        <View style={{ margin: 5, width: Dimensions.get("window").width - 10 }}>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={text => this.setState({ title: text })}
            placeholder="제목"
          />
        </View>
        <View style={{ margin: 5, width: Dimensions.get("window").width - 10 }}>
          <TextInput
            style={{ height: 200, borderColor: "gray", borderWidth: 1 }}
            onChangeText={text => this.setState({ description: text })}
            multiline={true}
            scrollEnabled={true}
            placeholder="내용"
          />
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: "space-evenly" }}
        >
          <Chip onPress={() => this.setState({ money: this.state.money + 10 })}>
            + 10
          </Chip>
          <Chip
            onPress={() => this.setState({ money: this.state.money + 100 })}
          >
            + 100
          </Chip>
          <Chip
            onPress={() => this.setState({ money: this.state.money + 1000 })}
          >
            + 1000
          </Chip>
          <Chip
            onPress={() => this.setState({ money: this.state.money + 10000 })}
          >
            + 10000
          </Chip>
          <Chip onPress={() => this.setState({ money: 0 })}>Reset</Chip>
        </ScrollView>
        <View style={{ margin: 5, width: Dimensions.get("window").width - 10 }}>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              alignItems: "flex-end"
            }}
            onChangeText={text => this.setState({ money: text })}
            keyboardType="numeric"
            placeholder="계약금"
            value={`${this.state.money}`}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log("Pressed");
          }}
        >
          <View
            style={{
              backgroundColor: "orange",
              borderWidth: 1,
              borderColor: "orange",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
              height: 40,
              width: Dimensions.get("window").width - 10
            }}
          >
            <Text>요청하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});

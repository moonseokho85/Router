import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Appbar
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import MyPromiseCard from "../components/MyPromiseCard";

export default class PromiseWaitingScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-cash" style={{ color: tintColor }} size={30} />
    )
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        {/* <Appbar.Header style={{ backgroundColor: "white" }}>
          <Ionicons
            name="md-menu"
            size={34}
            color="#FFA800"
            style={{ marginLeft: 10 }}
          />
          <Text style={{ textAlign: "center" }} />
          <Appbar.Content title="Router." />
        </Appbar.Header> */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 10
          }}
        >
          <Button
            style={{ backgroundColor: "#FFA800", width: 109, height: 35 }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>대기중</Text>
          </Button>
          <Button
            style={{
              backgroundColor: "aliceblue",
              borderColor: "#FFA800",
              borderWidth: 1,
              width: 109,
              height: 35
            }}
            onPress={() => navigate("PromiseProceeding")}
          >
            <Text style={{ color: "gray", textAlign: "center" }}>진행중</Text>
          </Button>
          <Button
            style={{
              backgroundColor: "aliceblue",
              borderColor: "#FFA800",
              borderWidth: 1,
              width: 109,
              height: 35
            }}
            onPress={() => navigate("PromiseCompleted")}
          >
            <Text style={{ color: "gray", textAlign: "center" }}>완료</Text>
          </Button>
        </View>

        <ScrollView>
          <MyPromiseCard />
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

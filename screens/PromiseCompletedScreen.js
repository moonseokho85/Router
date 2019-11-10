import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Appbar,
  IconButton
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import MyPromiseCard from "../components/MyPromiseCard";
import { withCollapsibleForTabChild } from "react-navigation-collapsible";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class PromiseCompletedScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-cash" style={{ color: tintColor }} size={30} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      promiseData: [],
      mockData: [
        {
          sender: "문어",
          senderUri:
            "https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg",
          receiver: "전체",
          receiverUri: "",
          content: "인생머리 찾아드려요~~!!",
          money: "1,000"
        },
        {
          sender: "문어",
          senderUri:
            "https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg",
          receiver: "전체",
          receiverUri: "",
          content: "인생머리 찾아드려요~~!!",
          money: "1,000"
        },
        {
          sender: "문어",
          senderUri:
            "https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg",
          receiver: "전체",
          receiverUri: "",
          content: "인생머리 찾아드려요~~!!",
          money: "1,000"
        },
        {
          sender: "문어",
          senderUri:
            "https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg",
          receiver: "전체",
          receiverUri: "",
          content: "인생머리 찾아드려요~~!!",
          money: "1,000"
        },
        {
          sender: "문어",
          senderUri:
            "https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg",
          receiver: "전체",
          receiverUri: "",
          content: "인생머리 찾아드려요~~!!",
          money: "1,000"
        },
        {
          sender: "문어",
          senderUri:
            "https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg",
          receiver: "전체",
          receiverUri: "",
          content: "인생머리 찾아드려요~~!!",
          money: "1,000"
        },
        {
          sender: "문어",
          senderUri:
            "https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg",
          receiver: "전체",
          receiverUri: "",
          content: "인생머리 찾아드려요~~!!",
          money: "1,000"
        }
      ]
    };
  }

  renderItem = ({ item }) => (
    <MyPromiseCard
      sender={item.sender}
      senderUri={item.senderUri}
      receiver={item.receiver}
      content={item.content}
      money={item.money}
    />
  );

  _ListHeaderComponent = () => {
    return (
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <Card onPress={() => {this.props.navigation.navigate('Request')}}>
          <Card.Title
            title="요청하기"
            left={props => <Icon {...props} name="md-add-circle" color="orange" />}
          />
        </Card>
      </View>
    );
  };

  render() {
    // const { navigate } = this.props.navigation;
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withCollapsibleForTabChild(PromiseCompletedScreen);

import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Button
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default class ReplyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.state.params.email,
      title_no: this.props.navigation.state.params.title_no,
      de_menu: this.props.navigation.state.params.de_menu,
      fetchData: []
    };
  }

  async componentDidMount() {
    await fetch("http://34.82.57.148:8080/react_native_reple_view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        title_no: this.state.title_no,
        de_menu: this.state.de_menu
      })
    })
      .then(res => res.json())
      .then(resData => this.setState({ fetchData: resData }))
      .catch(error => console.log(error))
      .finally(() => console.log(this.state.fetchData));
  }

  renderItem = ({ item }) => {
    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            square
            style={{ borderRadius: 10 }}
            source={{
              uri: item.reple_profile_url
            }}
          />
        </Left>
        <Body>
          <Text style={{ fontWeight: "bold" }}>
            {item.reple_id}
            <Text style={{ fontSize: 7 }}> {item.createdate}</Text>
          </Text>
          <Text>{item.reple_text}</Text>
        </Body>
        <Right>
          <TouchableOpacity>
            <Ionicons name="md-more" size={20} />
          </TouchableOpacity>
        </Right>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.fetchData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

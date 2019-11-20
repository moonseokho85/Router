import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Button
} from "native-base";

export default class ListComponent extends Component {
  render() {
    return (
      <Card>
        <CardItem thumbnail>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: 100, height: 100 }}>
              <Thumbnail
                square
                large
                source={{ uri: this.props.upload_image }}
              />
            </View>

            <View>
              <View
                style={{
                  width: 250,
                  height: 75,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text numberOfLines={2}>{this.props.title}</Text>
              </View>
              <View
                style={{
                  width: 250,
                  height: 75,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text note numberOfLines={3}>
                  {this.props.description}
                </Text>
              </View>
            </View>

            {/* <Right>
                  <Button transparent>
                    <Text>View</Text>
                  </Button>
                </Right> */}
          </View>
        </CardItem>
      </Card>
    );
  }
}

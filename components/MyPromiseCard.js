import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default class MyPromiseCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <Card style={{ elevation: 3 }}>
          <View style={{ flexDirection: "row", padding: 10 }}>
            <View>
              <Image
                style={{ height: 35, width: 35, borderRadius: 40 }}
                source={{ uri: this.props.senderUri }}
              />
              <Text>{this.props.sender}</Text>
            </View>
            <View>
              <Card.Content>
                <Title style={{ fontSize: 12 }}>성신여대 헤어 스튜디오</Title>
                <Paragraph style={{ fontSize: 11 }}>
                  {this.props.content}
                </Paragraph>
                <Paragraph style={{ fontSize: 10 }}>~2020.01.29</Paragraph>
              </Card.Content>
            </View>
            <View>
              <Card.Content>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: 1
                  }}
                >
                  <Button
                    mode="contained"
                    style={{ backgroundColor: "#FFA800", marginBottom: 35 }}
                  >
                    <Text style={{ color: "white", fontSize: 12 }}>
                      {this.props.receiver}
                    </Text>
                  </Button>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#FFA800",
                      fontWeight: "bold"
                    }}
                  >
                    {this.props.money}er
                  </Text>
                </View>
              </Card.Content>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

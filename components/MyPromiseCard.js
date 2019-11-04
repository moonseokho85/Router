import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function MyPromiseCard() {
  return (
    <View style={{ margin: 10 }}>
      <Card style={{ elevation: 3 }}>
        <View style={{ flexDirection: "row", padding: 10 }}>
          {/* <Image
            style={{ height: 70, width: 70, borderRadius: 40 }}
            source={require("../profile.jpg")}
          /> */}
          <View>
            <Card.Content>
              <Title style={{ fontSize: 15 }}>성신여대 헤어 스튜디오</Title>
              <Paragraph style={{ fontSize: 13 }}>
                인생머리 찾아드려요~!
              </Paragraph>
              <Paragraph style={{ fontSize: 11 }}>~2020.01.29</Paragraph>
            </Card.Content>
          </View>
          <View>
            <Card.Content>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around",
                  padding: 10
                }}
              >
                <Button
                  mode="contained"
                  style={{ backgroundColor: "#FFA800", marginBottom: 35 }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>전체</Text>
                </Button>
                <Text
                  style={{ fontSize: 20, color: "#FFA800", fontWeight: "bold" }}
                >
                  1000er
                </Text>
              </View>
            </Card.Content>
          </View>
        </View>
      </Card>
    </View>
  );
}

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class LikeButton extends React.Component {
  state = {
    subscribed: false
  };

  subscriptionImage = async () => {
    const subscriptionState = await !this.state.subscribed;
    this.setState({ subscribed: subscriptionState });
  };

  render() {
    const { subscribed } = this.state;
    const colorValue = subscribed ? "grey" : "red";
    const subscriptionValue = subscribed ? "1" : "0";

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.subscriptionImage}>
          <View
            style={{
              width: 50,
              height: 30,
              borderRadius: 2,
			  backgroundColor: colorValue,
			  justifyContent: 'center',
			  alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              구독
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  likeNumberStyle: {
    fontSize: 16,
    fontWeight: "bold"
  }
});

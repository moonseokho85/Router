import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class LikeButton extends React.Component {
  state = {
    liked: false
  };

  likeImage = async () => {
    const likeState = await !this.state.liked;
    this.setState({ liked: likeState });
  };

  render() {
    const { liked } = this.state;
    const colorValue = liked ? "#fb7777" : "black";
    const likeValue = liked ? "1" : "0";

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.likeImage}>
          <Ionicons name="md-thumbs-up" size={20} color={colorValue} />
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

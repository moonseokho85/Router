import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: false
    };
  }

  componentDidMount(){
    
  }

  subscriptionImage = async () => {
    const subscriptionState = !this.state.subscribed;
    await this.setState({ subscribed: subscriptionState });
  };

  render() {
    const { subscribed } = this.state;
    const colorValue = subscribed ? "orange" : "grey";
    const subscriptionValue = subscribed ? "1" : "0";

    console.log("--- subscription props ---", this.props);

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.subscriptionImage}>
          <View
            style={{
              width: 50,
              height: 30,
              borderRadius: 2,
              backgroundColor: colorValue,
              justifyContent: "center",
              alignItems: "center"
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

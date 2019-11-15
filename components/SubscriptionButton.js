import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import firebase from 'firebase'

export default class SubscriptionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: false,
      fetchData: []
    };
  }

  async componentDidMount() {
    await this.setState({ fetchData: this.props.fetchData });
    await this.setState({ subscribed: this.state.fetchData[0].follow });
  }

  subscriptionImage = async () => {
    var user = firebase.auth().currentUser;
    const subscriptionState = !this.state.subscribed;
    await this.setState({ subscribed: subscriptionState });

    fetch("http://34.82.57.148:8080/react_native_follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: this.state.fetchData[0].id,
        user: user.email,
        subscribe: this.state.subscribed
      })
    })
      .then(res => res.json())
      .then(resData => console.log(resData))
      .catch(error => console.log(error));
  };

  render() {
    const { subscribed } = this.state;
    const colorValue = subscribed ? "grey" : "orange";
    const subscriptionValue = subscribed ? "1" : "0";
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.subscriptionImage}>
          {this.state.subscribed ? (
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
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
              >
                구독중
              </Text>
            </View>
          ) : (
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
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                구독
              </Text>
            </View>
          )}
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

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";

export default class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unliked: false,
      liked: false,
      email: "",
      // title: "",
      title_no: "",
      user: "",
      up_text: "",
      down_text: ""
    };
  }

  async componentDidMount() {
    var user = firebase.auth().currentUser;
    await this.setState({
      email: this.props.email,
      user: this.props.user,
      // title: this.props.title,
      title_no: this.props.title_no,
      de_menu: this.props.de_menu,
      up_text: this.props.up_text,
      down_text: this.props.down_text
    });

    if (this.state.up_text === "init") {
      this.setState({ liked: false });
    } else if (this.state.up_text.indexOf("|" + user.email) > -1) {
      this.setState({ liked: true });
    } else {
      this.setState({ liked: false });
    }

    if (this.state.down_text === "init") {
      this.setState({ unliked: false });
    } else if (this.state.down_text.indexOf("|" + user.email) > -1) {
      this.setState({ unliked: true });
    } else {
      this.setState({ unliked: false });
    }
  }

  likeImage = async () => {
    const likeState = !this.state.liked;
    await this.setState({ liked: likeState });

    // console.log("--- like button pressed ---");

    fetch("http://34.82.57.148:8080/react_native_like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        title_no: this.state.title_no,
        de_menu: this.state.de_menu,
        user: this.state.user,
        liked: this.state.liked,
        // unliked: this.state.unliked
      })
    })
      .then(res => res.json())
      .then(resData => console.log(resData))
      .catch(error => console.log(error));
  };

  unlikeImage = async () => {
    const unlikeState = !this.state.unliked;
    await this.setState({ unliked: unlikeState });

    // console.log("--- like button pressed ---");

    fetch("http://34.82.57.148:8080/react_native_like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        title_no: this.state.title_no,
        de_menu: this.state.de_menu,
        user: this.state.user,
        // liked: this.state.liked,
        unliked: this.state.unliked
      })
    })
      .then(res => res.json())
      .then(resData => console.log(resData))
      .catch(error => console.log(error));
  };

  render() {
    var user = firebase.auth().currentUser;
    const { liked, unliked } = this.state;
    const likedcolorValue = liked ? "#fb7777" : "black";
    const unlikedcolorValue = unliked ? "blue" : "black";
    const likeValue = liked ? "1" : "0";
    // console.log("--- Like Button THIS.PROPS PARAMS ---", this.props);

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.likeImage}>
          <View style={{marginRight: 10}}>
            <Ionicons name="md-thumbs-up" size={30} color={likedcolorValue} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.unlikeImage}>
          <View>
            <Ionicons
              name="md-thumbs-down"
              size={30}
              color={unlikedcolorValue}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  likeNumberStyle: {
    fontSize: 16,
    fontWeight: "bold"
  }
});

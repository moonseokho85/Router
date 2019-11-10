import React, { Component } from "react";
import { Text, StyleSheet, View, Image, Dimensions } from "react-native";
import HTMLView from "react-native-htmlview";
import { ScrollView } from "react-native-gesture-handler";
import HTML from "react-native-render-html";

export default class ContentDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: []
    };
  }

  componentDidMount() {
    this.setState({ Data: this.props.navigation.state.params });
  }

  renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == "img") {
      const a = node.attribs;
      return (
        <Image
          style={{ width: Dimensions.get("window").width, height: 500 }}
          source={{ uri: a.src }}
        />
      );
    }
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <HTML
          html={this.state.Data.content}
          imagesMaxWidth={Dimensions.get("window").width}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

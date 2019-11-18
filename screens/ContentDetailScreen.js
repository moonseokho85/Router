import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  WebView
} from "react-native";

export default class ContentDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: this.props.navigation.state.params
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ html: this.state.Data.content }}
          scalesPageToFit={true}
          style={styles.container}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  }
});

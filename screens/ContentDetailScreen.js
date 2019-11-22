import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  WebView,
  ScrollView
} from "react-native";
import Slider from "../components/Slider";
import MapView from "react-native-maps";

export default class ContentDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: this.props.navigation.state.params,
      content: "",
      images: []
    };
  }

  async componentDidMount() {
    await this.setState({ content: this.state.Data.content });
    var a = this.state.content;
    a = a.match(/src="([^"]+)/g);
    this.setState({ images: a });
  }

  render() {
    if (this.state.images === null) {
      return (
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 10
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {this.state.Data.title}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <Text>{this.state.Data.createdDate}</Text>
          </View>
          <Slider images={this.state.Data.upload_image} />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10
            }}
          >
            <Text>{this.state.Data.content}</Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <MapView
              initialRegion={{
                latitude: Number(this.state.Data.latitude),
                longitude: Number(this.state.Data.longitude),
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
              }}
              showsUserLocation={true}
              style={{
                width: Dimensions.get("window").width - 10,
                height: 200
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: Number(this.state.Data.latitude),
                  longitude: Number(this.state.Data.longitude)
                }}
                title={this.state.Data.title}
                description={this.state.Data.content}
                draggable
              />
            </MapView>
          </View>
        </ScrollView>
      );
    } else {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  }
});

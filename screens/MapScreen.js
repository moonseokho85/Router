import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import CurrentLocationButton from "../components/CurrentLocationButton";
import { Ionicons } from "@expo/vector-icons";

import ClusterMarker from "../components/ClusterMarker";
import { getCluster } from "../utils/MapUtils";

import firebase from "firebase";

export default class MapScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-map" style={{ color: tintColor }} size={30} />
      // <Ionicons name='md-compass'/>
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      region: null,
      fetchData: [
        {
          lat: 36.363091,
          lng: 127.3758221,
          title:
            "맛잇어",
          content: "맛잇는 가게"
        },
        {
          lat: 36.364091,
          lng: 127.3758221,
          title: "맛잇어",
          content: "맛잇는 가게"
        },
        {
          lat: 36.365091,
          lng: 127.3758221,
          title: "맛잇어",
          content: "맛잇는 가게"
        },
        {
          lat: 36.366091,
          lng: 127.3758221,
          title: "맛잇어",
          content: "맛잇는 가게"
        },
        {
          lat: 36.367091,
          lng: 127.3758221,
          title: "맛잇어",
          content: "맛잇는 가게"
        }
      ],
      isLoading: false,
      refreshing: false,
      fetchData2:[]
    };
    this._getLocationAsync();
  }

  async componentDidMount() {
    await this._fetchData();
  }

  // componentWillMount() {
  //   if (Platform.OS === 'android' && !Constants.isDevice) {
  //     this.setState({
  //       errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
  //     });
  //   } else {
  //     this._getLocationAsync();
  //   }
  // }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });

    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };

    await this.setState({ region: region });
  };

  centerMap() {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    } = this.state.region;

    console.log("centerMap clicked");
    console.log(latitude);

    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    });
  }

  _fetchData = () => {
    var user = firebase.auth().currentUser;

    var data = {
      email: user.email
    };

    this.setState({
      isLoading: true,
      refreshing: true,
      fetchData: []
    });

    fetch("http://34.82.57.148:8080/react_native_content_allselect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(resData =>
        this.setState({
          fetchData2: resData.select,
          following: resData.following
        })
      )
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({ isLoading: false, refreshing: false });
      });
  };

  renderMarker = (marker, index) => {
    const key = index + marker.geometry.coordinates[0];

    // If a cluster
    if (marker.properties) {
      return (
        <MapView.Marker
          key={key}
          coordinate={{
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0]
          }}
        >
          <ClusterMarker count={marker.properties.point_count} />
        </MapView.Marker>
      );
    }
    // If a single marker
    return (
      <MapView.Marker
        key={key}
        coordinate={{
          latitude: marker.geometry.coordinates[1],
          longitude: marker.geometry.coordinates[0]
        }}
        title={marker.geometry.coordinates[2]}
        description={marker.geometry.coordinates[3]}
      />
    );
  };

  render() {
    const { region } = this.state;

    const allCoords = this.state.fetchData.map(c => ({
      geometry: {
        coordinates: [c.lng, c.lat, c.title, c.content]
      }
    }));

    const cluster = getCluster(allCoords, region);
    console.log(this.state.fetchData2);
    return (
      <View style={styles.container}>
        <CurrentLocationButton
          cb={() => {
            this.centerMap();
          }}
        />
        <MapView
          provider={"google"}
          initialRegion={this.state.region}
          // mapType={"standard"}
          showsUserLocation={true}
          showsCompass={true}
          rotateEnabled={true}
          ref={map => {
            this.map = map;
          }}
          style={styles.mapStyle}
          onRegionChangeComplete={region => this.setState({ region })} // centerMap과 충돌
        >
          {cluster.markers.map((marker, index) =>
            this.renderMarker(marker, index)
          )}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 112, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 20 / 2,
    overflow: "hidden",
    backgroundColor: "#007AFF"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    ...StyleSheet.absoluteFill
  }
});

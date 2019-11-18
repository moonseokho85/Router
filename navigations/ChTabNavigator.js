import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  Animated,
  Image,
  TouchableOpacity
} from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import ChannelHomeScreen from "../screens/ChannelHomeScreen";
import ChannelContentListScreen from "../screens/ChannelContentListScreen";
import ChannelCommunityScreen from "../screens/ChannelCommunityScreen";
import ChannelInfoScreen from "../screens/ChannelInfoScreen";
import { withCollapsibleForTab } from "react-navigation-collapsible";

const ChTabNavigator = createMaterialTopTabNavigator(
  {
    홈: {
      screen: ChannelHomeScreen
    },
    글목록: {
      screen: ChannelContentListScreen
    },
    커뮤니티: {
      screen: ChannelCommunityScreen
    },
    정보: {
      screen: ChannelInfoScreen
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        height: 40,
        ...Platform.select({
          ios: {
            backgroundColor: "white"
          },
          android: {
            backgroundColor: "white"
          }
        })
      },
      iconStyle: { height: 50 },
      activeTintColor: "orange",
      inactiveTintColor: "#d1cece",
      upperCaseLabel: false,
      showLabel: true,
      showIcon: false
    }
  }
);

const url_cat =
  "https://boygeniusreport.files.wordpress.com/2015/06/funny-cat.jpg";

// eslint-disable-next-line no-unused-vars
const GroupImageHeader = ({ navigation, collapsible }) => {
  // eslint-disable-next-line no-unused-vars

  const { translateY, translateOpacity, translateProgress } = collapsible;

  return (
    <View style={{ width: "100%", height: "100%", justifyContent: "flex-end" }}>
      <Image
        source={{ uri: url_cat }}
        resizeMode="cover"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.5
        }}
      />
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          marginLeft: 10
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            paddingTop: 40
          }}
        >
          <Animated.Image
            source={{ uri: navigation.state.params.profile_image_url }}
            resizeMode="cover"
            style={{
              transform: [{ scale: translateOpacity }],
              alignSelf: "center",
              width: 100,
              height: 100,
              borderWidth: 4,
              borderColor: "white",
              borderRadius: 10
            }}
          />
          <Animated.View>
            <View style={{ justifyContent: "center", marginLeft: 10 }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                {navigation.state.params.nickname}
              </Text>
              <Text style={{ fontSize: 10, color: "white" }}>
                {navigation.state.params.email}
              </Text>
            </View>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const collapsibleParams = {
  collapsibleComponent: GroupImageHeader,
  collapsibleBackgroundStyle: {
    height: 200,
    backgroundColor: "#061"
  }
};

export default withCollapsibleForTab(ChTabNavigator, collapsibleParams);

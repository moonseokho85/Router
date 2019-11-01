import React, { Component } from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import ChannelHomeScreen from "../screens/ChannelHomeScreen";
import ChannelContentListScreen from "../screens/ChannelContentListScreen";
import ChannelCommunityScreen from "../screens/ChannelCommunityScreen";
import ChannelInfoScreen from "../screens/ChannelInfoScreen";
import { createAppContainer } from "react-navigation";
import ChannelHomeStack from "../stacks/ChannelHomeStack";

const ChTabNavigator = createMaterialTopTabNavigator(
  {
    홈: {
      screen: ChannelHomeStack
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

const ChAppTabNavigator = createAppContainer(ChTabNavigator);

export default ChAppTabNavigator;

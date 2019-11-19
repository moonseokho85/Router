import React, { Component } from "react";
import { Text, StyleSheet, View, Platform, Button } from "react-native";

import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import SearchStack from "../stacks/SearchStack";
import MapScreen from "../screens/MapScreen";
// import PromiseScreen from "../screens/PromiseScreen";

import HomeStack from "../stacks/HomeStack";
import MyPageStack from "../stacks/MyPageStack";

import { createStackNavigator } from "react-navigation-stack";
// import { Icon } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";
import MapStack from "../stacks/MapStack";
import PromiseStack from "../stacks/PromiseStack";

const BottomTabNavigator = createBottomTabNavigator(
  {
    홈: {
      screen: HomeStack,

      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" style={{ color: tintColor }} size={30} />
        )
      }
    },

    검색: {
      screen: SearchStack,

      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-search" style={{ color: tintColor }} size={30} />
        )
      }
    },

    지도: {
      screen: MapStack,

      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-map" style={{ color: tintColor }} size={30} />
          // <Ionicons name='md-compass'/>
        )
      }
    },

    약속: {
      screen: PromiseStack,

      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-paper" style={{ color: tintColor }} size={30} />
        )
      }
    },

    내정보: {
      screen: MyPageStack,

      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-person" style={{ color: tintColor }} size={30} />
        )
      }
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style: {
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
      showIcon: true
    }
  }
);

const BottomStackNavigator = createStackNavigator(
  {
    BottomTabNavigation: BottomTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        header: null,
        title: "Router.",
        headerRight: (
          <Icon
            name="ios-menu"
            size={30}
            style={{ paddingRight: 30 }}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
);

export default BottomStackNavigator;

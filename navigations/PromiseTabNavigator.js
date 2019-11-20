import React, { Component } from "react";
import { Platform } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import PromiseWaitingScreen from "../screens/PromiseWaitingScreen";
import PromiseProceedingScreen from "../screens/PromiseProceedingScreen";
import PromiseCompletedScreen from "../screens/PromiseCompletedScreen";

import {withCollapsibleForTab} from 'react-navigation-collapsible';


const PromiseTabNavigator = createMaterialTopTabNavigator(
  {
    대기중: {
      screen: PromiseWaitingScreen
    },
    진행중: {
      screen: PromiseProceedingScreen
    },
    완료됨: {
      screen: PromiseCompletedScreen
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        height: 50,
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

const PromiseAppTabNavigator = createAppContainer(PromiseTabNavigator);

export default withCollapsibleForTab(PromiseAppTabNavigator, {
  iOSCollapsedColor: '#032',
  });

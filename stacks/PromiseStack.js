import React from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import PromiseWaitingScreen from "../screens/PromiseWaitingScreen";
import PromiseProceedingScreen from "../screens/PromiseProceedingScreen";
import PromiseCompletedScreen from "../screens/PromiseCompletedScreen";
import PromiseAppTabNavigator from "../navigations/PromiseTabNavigator";
import RequestScreen from "../screens/RequestScreen";

const PromiseStack = createStackNavigator({
  Promise: {
    screen: PromiseAppTabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        title: "Router.",
        headerRight: (
          <Icon
            style={{ paddingRight: 20 }}
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={30}
          />
        )
      };
    }
  },
  Request: {
    screen: RequestScreen,
    navigationOptions: {
      title: "요청"
    }
  }
});

export default PromiseStack;

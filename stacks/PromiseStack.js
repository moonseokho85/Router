import React from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import PromiseWaitingScreen from "../screens/PromiseWaitingScreen";
import PromiseProceedingScreen from "../screens/PromiseProceedingScreen";
import PromiseCompletedScreen from "../screens/PromiseCompletedScreen";

const PromiseStack = createStackNavigator({
  PromiseWaiting: {
    screen: PromiseWaitingScreen,
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
  PromiseProceeding: {
    screen: PromiseProceedingScreen,
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

  PromiseCompleted: {
    screen: PromiseCompletedScreen,
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
  }
});

export default PromiseStack;

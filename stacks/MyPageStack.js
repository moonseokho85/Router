import React from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import MyPageScreen from "../screens/MyPageScreen";
import ChannelScreen from "../screens/ChannelScreen";
import ReplyScreen from "../screens/ReplyScreen";

const MyPageStack = createStackNavigator({
  MyPage: {
    screen: MyPageScreen,
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

  MyChannel: {
    screen: ChannelScreen,

    navigationOptions: {
      header: null
    }
  },
  Reply : {
    screen : ReplyScreen
  }
});

export default MyPageStack;

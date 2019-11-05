import React from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import MyPageScreen from "../screens/MyPageScreen";
import ChannelScreen from "../screens/ChannelScreen";
import ReplyScreen from "../screens/ReplyScreen";
import SettingScreen from "../screens/SettingScreen";
import NoticeScreen from "../screens/NoticeScreen";
import SubscriptionListScreen from "../screens/SubscriptionListScreen";
// import ChTabNavigator from "../navigations/ChTabNavigator";
import MyChTabNavigator from "../navigations/MyChTabNavigator";
import UploadStack from "../stacks/UploadStack";
// import MyChannelAppStack from "./MyChannelStack";

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
    screen: MyChTabNavigator,

    navigationOptions: {
      header: null
    }
  },

  Post : {
    screen : UploadStack
  },

  SubscriptionChannel: {
    screen: SubscriptionListScreen,

    navigationOptions: {
      title: '구독 중인 채널'
    }
  },

  Reply: {
    screen: ReplyScreen,

    navigationOptions: {
      title: '댓글'
    }
  },

  Notice: {
    screen: NoticeScreen,

    navigationOptions: {
      title: '공지사항'
    }
  },

  Setting: {
    screen: SettingScreen,

    navigationOptions: {
      title: '설정'
    }
  }
});

export default MyPageStack;

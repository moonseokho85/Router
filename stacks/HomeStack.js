import React from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import ChannelScreen from "../screens/ChannelScreen";
import PostScreen from "../screens/PostScreen";
import UploadStack from "./UploadStack";
import ChAppTabNavigator from "../navigations/ChTabNavigator";
import { createAppContainer } from "react-navigation";
import SubscriptionListScreen from "../screens/SubscriptionListScreen";
import ReplyScreen from "../screens/ReplyScreen";
import ContentDetailScreen from "../screens/ContentDetailScreen";
import ChTabNavigator from "../navigations/ChTabNavigator";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,

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

    CreatorChannel: {
      screen: ChTabNavigator,

      navigationOptions: {
        header: null
      }
    },

    Post: {
      screen: UploadStack,

      navigationOptions: {
        title: "업로드"
      }
    },

    SubscriptionList: {
      screen: SubscriptionListScreen,

      navigationOptions: {
        title: "구독 중"
      }
    },

    Reply: {
      screen: ReplyScreen,

      navigationOptions: {
        title: "댓글"
      }
    },
    Detail: {
      screen: ContentDetailScreen,

      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{ color: tintColor }} size={30} />
      )
    }
  }
);

export default createAppContainer(HomeStack);

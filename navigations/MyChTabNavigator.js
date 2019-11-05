import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  Animated,
  Image
} from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import ChannelHomeScreen from "../screens/ChannelHomeScreen";
import ChannelContentListScreen from "../screens/ChannelContentListScreen";
import ChannelCommunityScreen from "../screens/ChannelCommunityScreen";
import ChannelInfoScreen from "../screens/ChannelInfoScreen";
import { createAppContainer } from "react-navigation";
import ChannelHomeStack from "../stacks/ChannelHomeStack";
import TabChild1Screen from "../screens/TabChild1Screen";

import { withCollapsibleForTab } from "react-navigation-collapsible";
import firebase from "firebase";
import MyChannelHomeScreen from "../screens/MyChannelHomeScreen";
import SubscriptionButton from '../components/SubscriptionButton'
import { TouchableHighlight } from "react-native-gesture-handler";

const MyChTabNavigator = createMaterialTopTabNavigator(
  {
    홈: {
      screen: MyChannelHomeScreen
    },
    글목록: {
      screen: TabChild1Screen
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
  // console.log(collapsible)

  var user = firebase.auth().currentUser;

  const { translateY, translateOpacity, translateProgress } = collapsible;

  return (
    <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
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
      <Animated.Image
        source={{ uri: user.photoURL }}
        resizeMode="cover"
        style={{
          transform: [{ scale: translateOpacity }],
          alignSelf: "center",
          width: 100,
          height: 100,
          borderWidth: 4,
          borderColor: "white",
          borderRadius: 50
        }}
      />
      <Animated.View>
          <TouchableHighlight onPress={()=>{navigation.navigate('Post')}}>
              <Text>Post</Text>
          </TouchableHighlight>
      </Animated.View>
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

export default withCollapsibleForTab(MyChTabNavigator, collapsibleParams);

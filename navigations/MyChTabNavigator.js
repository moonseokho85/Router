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
import { Icon } from "native-base";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import ChannelHomeScreen from "../screens/ChannelHomeScreen";
import ChannelContentListScreen from "../screens/ChannelContentListScreen";
import ChannelCommunityScreen from "../screens/ChannelCommunityScreen";
import ChannelInfoScreen from "../screens/ChannelInfoScreen";
import { createAppContainer } from "react-navigation";
import TabChild1Screen from "../screens/TabChild1Screen";

import { withCollapsibleForTab } from "react-navigation-collapsible";
import firebase from "firebase";
import MyChannelHomeScreen from "../screens/MyChannelHomeScreen";
import SubscriptionButton from "../components/SubscriptionButton";
import { TouchableHighlight } from "react-native-gesture-handler";
import MyChannelContentListScreen from "../screens/MyChannelContentListScreen";
import MyChannelCommunityScreen from "../screens/MyChannelCommunityScreen";

const MyChTabNavigator = createMaterialTopTabNavigator(
  {
    홈: {
      screen: MyChannelHomeScreen
    },
    글목록: {
      screen: MyChannelContentListScreen
    },
    커뮤니티: {
      screen: MyChannelCommunityScreen
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

  var user = firebase.auth().currentUser;

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
          // backgroundColor: "blue"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            paddingTop: 60
          }}
        >
          <Animated.Image
            source={{ uri: navigation.state.params.profile_url }}
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
                {user.displayName}
              </Text>
              <Text style={{ fontSize: 10, color: "white" }}>{user.email}</Text>
            </View>
          </Animated.View>
        </View>

        <Animated.View>
          <View style={{ marginLeft: 40 }}>
            <TouchableOpacity>
              <Icon
                name="ios-add-circle"
                onPress={() => {
                  navigation.navigate("Post");
                }}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
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

export default withCollapsibleForTab(MyChTabNavigator, collapsibleParams);

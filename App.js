import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerNavigatorItems
} from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";

import LoginInputScreen from "./screens/LoginInputScreen";
import RegisterUserScreen from "./screens/RegisterUserScreen";
import LoginStack from "./stacks/LoginStack";

import firebase from "firebase";
import { firebaseConfig } from "./config";
import BottomStackNavigator from "./navigations/BottomTabNavigator";
import { Container, Header, Body, Content, Button, Root } from "native-base";
import { Router, Scene } from "react-native-router-flux";
import ChannelScreen from "./screens/ChannelScreen";
import PostScreen from "./screens/PostScreen";
import ChAppTabNavigator from "./navigations/ChTabNavigator";
import MyChTabNavigator from "./navigations/MyChTabNavigator";
import {setExpoStatusBarHeight} from 'react-navigation-collapsible';
import Constants from 'expo-constants';

setExpoStatusBarHeight(Constants.statusBarHeight);

firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  render() {
    return <AppSwitchNavigator />;
  }
}

const CustomDrawerContentComponent = props => {
  var user = firebase.auth().currentUser;

  return (
    <Container>
      <Header style={{ height: 200, backgroundColor: "orange" }}>
        <Body
          style={{
            // flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "flex-start"
          }}
        >
          <Image style={styles.drawerImage} source={{ uri: user.photoURL }} />
          <View style={{ marginLeft: 10, marginTop: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {user.displayName}
            </Text>
            <Text>{user.email}</Text>
          </View>
        </Body>
      </Header>

      <Content>
        <DrawerNavigatorItems {...props} />
      </Content>

      <Button
        style={{
          justifyContent: "center"
        }}
        onPress={() => firebase.auth().signOut()}
      >
        <Text>Sign out</Text>
      </Button>
    </Container>
  );
};

const AppDrawerNavigator = createDrawerNavigator(
  {
    홈: {
      screen: BottomStackNavigator
    },
    내채널: {
      screen: MyChTabNavigator
    }
  },
  {
    drawerPosition: "right",
    drawerType: "slide",
    initialRouteName: "홈",
    contentComponent: CustomDrawerContentComponent,
    // drawerOpenRoute: "DrawerOpen",
    // drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: {
    screen: LoadingScreen
  },
  LoginScreen: {
    screen: LoginStack,

    navigationOptions: {
      header: null
    }
  },
  MainScreen: {
    screen: AppDrawerNavigator
  }
});

export default createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  drawerImage: {
    height: 70,
    width: 70,
    borderRadius: 25,
    margin: 5
    // justifyContent : 'center',
    // alignContent : 'center',
  }
});

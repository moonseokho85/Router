import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import IconTextInput from "../components/IconTextInput";
import RoundButton from "../components/RoundButton";
import MainScreen from "../screens/MainScreen";
import { Actions } from "react-native-router-flux";

import firebase from "firebase";

export default class LoginInputScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  loginUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
          console.log(user);
        });
    } catch (error) {
      console.log(error, toString());
    }
  };

  updateValue(text, field) {
    if (field == "email") {
      this.setState({
        email: text
      });
    } else if (field == "password") {
      this.setState({
        password: text
      });
    }
  }

  // submit(){
  //     let collection = {}
  //     collection.email = this.state.email,
  //     collection.password = this.state.password

  //     var url = "http://34.82.57.148:8080/react_login";

  //     fetch(url, {
  //         method: 'POST', // or 'PUT'
  //         body: JSON.stringify({
  //             username : this.state.email,
  //             password : this.state.password
  //         }), // data can be `string` or {object}!
  //         headers:{
  //             'Content-Type': 'application/json',
  //             'Accept' : 'application/json'
  //         }
  //     }).then(res => res.json())
  //     .then(response => {
  //         if(response == "true"){
  //             Actions.home();
  //         }else if (response == "false"){
  //             Alert.alert(
  //                 '오류',
  //                 '회원이 아닙니다. 회원가입 하시겠습니까?',
  //                 [
  //                   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
  //                   {
  //                     text: 'Cancel',
  //                     onPress: () => this.props.navigation.goBack(),
  //                     style: 'cancel',
  //                   },
  //                   {text: 'OK', onPress: () => this.props.navigation.navigate('Register')},
  //                 ],
  //                 {cancelable: false},
  //               );
  //         }
  //     })
  //     .catch(error => console.error('Error:', error));

  // }

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center"
        }}
        behavior="padding"
      >
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 20,
              color: "black",
              marginTop: -20,
              fontWeight: "200"
            }}
          >
            이메일로 로그인
          </Text>
          <IconTextInput
            style={{ marginTop: 10 }}
            iconName="ios-mail"
            placeholder="Email"
            onChange={text => this.updateValue(text, "email")}
          />
          <IconTextInput
            style={{ marginTop: 10 }}
            iconName="md-key"
            placeholder="Password"
            onChange={text => this.updateValue(text, "password")}
            secureTextEntry={true}
          />
          <RoundButton
            style={{ marginTop: 10, }}
            title={"로그인"}
            onPress={() =>
              this.loginUser(this.state.email, this.state.password)
            }
          />
          <RoundButton
            style={{ marginTop: 10 }}
            title={"회원가입"}
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "column",
    padding: 30,
    alignItems: "center"
  }
});

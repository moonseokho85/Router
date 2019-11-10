import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import IconText from '../Components/IconText';
import IconTextInput from "../components/IconTextInput";
import RoundButton from "../components/RoundButton";
// import VehicleItem from '../Components/VehicleItem';
import { Icon } from "native-base";

import firebase from "firebase";

class RegisterUserScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      lastname: "",
      firstname: "",
      nickname: "",
      home_top_image: "",
      profile_image_url: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text>회원가입</Text>,
      headerLeft: (
        <TouchableOpacity
          style={{ paddingLeft: 15 }}
          onPress={() => {
            navigation.goBack(null);
          }}
        >
          <Icon name={"close"} size={44} color={"#aaa"} />
        </TouchableOpacity>
      )
    };
  };

  signUpUser = (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Please enter at least 6 characters");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error, toString());
    }
  };

  updateDB = () => {
    const data = {
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      nickname: this.state.nickname,
      home_top_image: this.state.home_top_image,
      profile_image_url: this.state.profile_image_url
    };

    fetch("http://34.82.57.148:8080/react_user_save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(resData => console.log(resData))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 30
        }}
        behavior="padding"
        keyboardVerticalOffset={64}
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              justifyContent: "center",
              alignContent: "center",
              marginBottom: 10
            }}
          >
            이메일로 회원가입
          </Text>
          <Text style={{ color: "#aaa" }}>
            <Icon name={"warning"} /> 회원가입하시려는 본인의 정보를 정확히
            입력해주세요.
          </Text>
          <View style={styles.container}>
            {/* <VehicleItem /> */}

            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={"ios-pricetag"}
              placeholder={"이메일 주소 입력"}
              onChange={email => this.setState({ email })}
            />
            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={"ios-pricetag"}
              placeholder={"비밀번호(영문,숫자,특수문자)"}
              secureTextEntry={true}
              onChange={password => this.setState({ password })}
            />
            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={"ios-pricetag"}
              placeholder={"성"}
              onChange={lastname => this.setState({ lastname })}
            />
            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={"ios-pricetag"}
              placeholder={"이름"}
              onChange={firstname => this.setState({ firstname })}
            />
            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={"ios-pricetag"}
              placeholder={"닉네임"}
              onChange={nickname => this.setState({ nickname })}
            />
            {/* <IconTextInput
             style={{ marginTop: 10 }}
             iconName={'ios-pricetag'}
             placeholder={'비밀번호 확인'}
             secureTextEntry={true}
           /> */}
            <RoundButton
              style={{ marginTop: 10 }}
              title={"회원 가입하기"}
              onPress={() => {
                Alert.alert(
                  "주의",
                  "확실히 회원가입을 하시겠습니까?",
                  [
                    {
                      text: "Ask me later",
                      onPress: () => console.log("Ask me later pressed")
                    },
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        this.signUpUser(this.state.email, this.state.password),
                          this.updateDB();
                      }
                    }
                  ],
                  { cancelable: false }
                );
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center"
  }
});

export default RegisterUserScreen;

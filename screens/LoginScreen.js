import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import * as Facebook from "expo-facebook";
import { ANDROID_CLIENT_ID, FACEBOOK_APP_ID } from "react-native-dotenv";

export default class LoginScreen extends Component {
  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log(user);
      }
    });
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = async googleUser => {
    await console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(result => {
              console.log("user signed in");
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    locale: result.additionalUserInfo.profile.locale,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(data => {
                    //success callback
                    console.log("data", data);
                  });
              } else {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        behavior: "web",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        await console.log("A", result);

        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  async loginwithFacebook() {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions
    } = await Facebook.logInWithReadPermissionsAsync(
      // "2181296531976373",
      FACEBOOK_APP_ID,
      {
        permissions: ["public_profile", "email"]
      }
    );
    if (type == "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(result => {
          console.log("A", result);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>
          Router.
        </Text>
        <View style={{ height: 200 }}></View>

        <View style={{ paddingTop: 80 }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("LoginInput");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: 300,
                height: 50,
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 10,
                margin: 5,
                backgroundColor: "orange"
              }}
            >
              <Image
                source={require("../assets/router_mark2.png")}
                style={{ width: 40, height: 30, margin: 10 }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  margin: 10,
                  color: "white"
                }}
              >
                이메일로 로그인
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.signInWithGoogleAsync();
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: 300,
                height: 50,
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 10,
                backgroundColor: "white",
                margin: 5
              }}
            >
              <Image
                source={require("../assets/google_mark.jpg")}
                style={{ width: 40, height: 30, margin: 10 }}
              />
              <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
                구글로 로그인
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.loginwithFacebook();
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: 300,
                height: 50,
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 10,
                backgroundColor: "#3b5998",
                margin: 5
              }}
            >
              <Image
                source={require("../assets/facebook_mark.png")}
                style={{ width: 40, height: 30, margin: 10 }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  margin: 10,
                  color: "white"
                }}
              >
                페이스북으로 로그인
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange"
  }
});

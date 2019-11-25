import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native";
import firebase from "firebase";

export default class MyPageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: []
    };
  }

  async componentDidMount() {
    var user = firebase.auth().currentUser;

    var data = {
      email: user.email
    };

    await fetch("http://34.82.57.148:8080/react_native_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(resData => this.setState({ Data: resData }))
      .catch(error => console.log(error));

    await console.log(this.state.Data)
  }

  render() {
    var user = firebase.auth().currentUser;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: this.state.Data.profile_url
              }}
            />

            <View style={{ marginTop: 45, marginLeft: 10 }}>
              <Text style={styles.name}>{this.state.Data.nickname}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "확인",
                  "정말로 로그아웃을 하시겠습니까?",
                  [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    {
                      text: "아니오",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "예", onPress: () => firebase.auth().signOut() }
                  ],
                  { cancelable: false }
                );
              }}
            >
              <View
                style={{
                  width: 70,
                  height: 20,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10
                }}
              >
                <Image
                  source={require("../assets/logout.jpg")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* 충전란 */}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignContent: "center",
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "orange",
                borderRadius: 5,
                width: Dimensions.get("screen").width - 10
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginRight: 5,
                  paddingTop: 2
                }}
              >
                10,000
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginRight: 5,
                  paddingTop: 2
                }}
              >
                원
              </Text>
              <View style={styles.Button}>
                <Button
                  title="충전하기"
                  onPress={() => Alert.alert("충전페이지")}
                  color="orange"
                />
              </View>
            </View>
          </View>
        </View>
        {/* 아이콘 */}
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("MyInfoRevise")}
            >
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://postfiles.pstatic.net/MjAxOTExMTJfMjgx/MDAxNTczNTQwNzYwMjA2.o5yFz6Xi6s3iaovr1ChULMAPaANS4zScf2720lUKNNwg.qZkFb4vr871dBjIYZy-fpRoy3LwR8fwy9kNzQY60mkkg.JPEG.operkop00/pencil.jpg?type=w773"
                  }}
                />
                <Text style={styles.info}>내 정보 수정</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("MyChannel", {
                  profile_url: this.state.Data.profile_url,
                  nickname: this.state.Data.nickname,
                  blog_main_image: this.state.Data.blog_main_image
                })
              }
            >
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://postfiles.pstatic.net/MjAxOTExMTJfNjAg/MDAxNTczNTQxOTE5MjU4.aWzN-Wh8JVnuiQI2pdX79EmbPiyRuBWIFS5mPkKssukg.yVcWTXbNkQ4RXFWQg4ldZRIrm8I_XXMtTnLW4ySCc4Eg.JPEG.operkop00/person4.jpg?type=w773"
                  }}
                />
                <Text style={styles.info}>내 채널</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("SubscriptionChannel")
              }
            >
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://postfiles.pstatic.net/MjAxOTExMTJfMTY1/MDAxNTczNTQyODYxMjQ0.FwXJi9lty562A7C6-rReMWD18vmXb5tEuZ1guWebCwgg.pmtd3fpUjFokcJCcHsxHykMemZ84e7LVuDlUjWBtcgcg.JPEG.operkop00/%EA%B5%AC%EB%8F%85123.jpg?type=w773"
                  }}
                />
                <Text style={styles.info}>구독채널</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.goToNextScreen()}>
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://postfiles.pstatic.net/MjAxOTExMTRfMTcw/MDAxNTczNjk4NTI4NDM1.xXjU3fvObLwm_wdf2i04kq0AXnXj0RjQYGLmwxrnQ7Ug.gT0PsTvM29ap9VW1_a5qGE8FlCwHxtSdUp0X60rKgZog.JPEG.operkop00/clock2131231.jpg?type=w773"
                  }}
                />
                <Text style={styles.info}>알람</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.goToNextScreen()}>
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://postfiles.pstatic.net/MjAxOTExMTRfMTQ0/MDAxNTczNjk1NzU4NzU3.samnaa3hFeG6-ZD6fTV3WklH_XgiIOXYMJYyNgLOdtog.wAKIy95FmcVW2lvLzuWx0tBV1-DJIzUkqs4avbf6IxQg.JPEG.operkop00/message4.jpg?type=w773"
                  }}
                />
                <Text style={styles.info}>메시지</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Notice")}
            >
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://postfiles.pstatic.net/MjAxOTExMTRfODIg/MDAxNTczNjk2NDM2MjU1.5HxfHPLf5I18QfCctdWk_9DGSffaedfmtZiMRmUBsDwg.A4cahE5NeRFOn4qx5vteaB734VIN-jpouH9urQoVUZAg.JPEG.operkop00/meph2.jpg?type=w773"
                  }}
                />
                <Text style={styles.info}>공지사항</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.goToNextScreen()}>
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://postfiles.pstatic.net/MjAxOTExMTRfNzIg/MDAxNTczNjk3MzM5ODg2.xipzdXW0hS3VNyfpewwar_wbNnGz5NgsMPb7vGb1uKsg.B118heIzqvEY4-UwxsbLnDTQq_rz1TttDtnx9PwTk30g.JPEG.operkop00/center123.jpg?type=w773"
                  }}
                />
                <Text style={styles.info}>고객센터</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Setting")}
            >
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://postfiles.pstatic.net/MjAxOTExMTJfMTkx/MDAxNTczNTM3NzI5MDA5.Cdr8Zs6Yj2VQ7Ps-3gbAfPQJ54kgKkzBqmngTN61mKYg.okZ0YlTt7mPIfl-K4yFFNSjS5xzeMA6FhrpvujGHnOYg.JPEG.operkop00/%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95.jpg?type=w773"
                  }}
                />
                <Text style={styles.info}>설정</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    // backgroundColor: "green"
  },
  headerContent: {
    marginLeft: 10,
    marginRight: 10,
    padding: 30,
    alignContent: "center", // 상단바 캐릭터
    flexDirection: "row"
    // backgroundColor: "blue"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderColor: "white",
    marginLeft: 10
  },
  name: {
    fontSize: 24,
    fontWeight: "600"
  },
  email: {
    fontSize: 10
  },
  Button: {
    width: 100,
    marginLeft: 290
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#000000"
  },
  bodyContent: {
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center"
  },
  Button: {
    width: 100
  },
  menuBox: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    elevation: 4
  },
  icon: {
    width: 40,
    height: 40 // 아이콘 사이즈
  },
  info: {
    fontSize: 10,
    marginTop: 7,
    color: "#696969" // 아이콘 텍스트
  }
});

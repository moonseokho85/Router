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
  }

  render() {
    var user = firebase.auth().currentUser;
    console.log(user);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: user.photoURL
              }}
            />

            <View style={{ marginTop: 45, marginLeft: 15 }}>
              <Text style={styles.name}>Helloworld2</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  '확인',
                  '정말로 로그아웃을 하시겠습니까?',
                  [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    {
                      text: '아니오',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: '예', onPress: () => firebase.auth().signOut()},
                  ],
                  {cancelable: false},
                );
                
              }}
            >
              <View
                style={{
                  width: 70,
                  height: 20,
                  borderRadius: 2,
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderColor: "orange",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10
                }}
              >
                <Text
                  style={{ fontSize: 10, fontWeight: "bold", color: "orange" }}
                >
                  로그 아웃
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "orange",
                borderRadius: 5,
                width: Dimensions.get("screen").width - 10
              }}
            >
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

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <TouchableOpacity Onpress={() => this.goToNextScreen()}>
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://devitt-forand.com/wp-content/uploads/2018/05/person-icon.png"
                  }}
                />
                <Text style={styles.info}>내 정보 수정</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("MyChannel")}
            >
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://devitt-forand.com/wp-content/uploads/2018/05/person-icon.png"
                  }}
                />
                <Text style={styles.info}>내 채널</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity Onpress={() => this.goToNextScreen()}>
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0icr8neC2LBtRWa39puWKK6hwn3EBcufol55fXmVtgoCgg_tkQ"
                  }}
                />
                <Text style={styles.info}>구독채널</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity Onpress={() => this.goToNextScreen()}>
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0icr8neC2LBtRWa39puWKK6hwn3EBcufol55fXmVtgoCgg_tkQ"
                  }}
                />
                <Text style={styles.info}>알람</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity Onpress={() => this.goToNextScreen()}>
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "http://www.pkicon.com/icons/13193/Black-Gift-Box-256.png"
                  }}
                />
                <Text style={styles.info}>메시지</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity Onpress={() => this.goToNextScreen()}>
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://postfiles.pstatic.net/MjAxOTEwMTVfMTA4/MDAxNTcxMTI1OTQ2NDU1.UdZp4TRqvw4w7sqJ9Ek_22jiDkJaXYs0MGoTKRwNs9Yg.2Ca4ES8_4JCU-cgiSGu0k3u_17xX5Ot4y6cjil9O6D4g.JPEG.operkop00/megaphone.jpg?type=w773"
                  }}
                />
                <Text style={styles.info}>공지사항</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity Onpress={() => this.goToNextScreen()}>
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "http://icons.iconarchive.com/icons/graphicloads/100-flat/256/phone-icon.png"
                  }}
                />
                <Text style={styles.info}>고객센터</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity Onpress={() => this.goToNextScreen()}>
              <View style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c17152c1-e3e6-425b-a192-250df05de8e0/dairhoj-e99c5ac0-06a9-45b2-9afe-50233848f75f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MxNzE1MmMxLWUzZTYtNDI1Yi1hMTkyLTI1MGRmMDVkZThlMFwvZGFpcmhvai1lOTljNWFjMC0wNmE5LTQ1YjItOWFmZS01MDIzMzg0OGY3NWYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BLO7tUFwteJxVTovxhWQBcgOWUs5Otr1u0aJAEu9RWQ"
                  }}
                />
                <Text style={styles.info}>설정</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{ flexDirection: "row" }}>
          <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
          <Button
            title="내 채널"
            onPress={() => this.props.navigation.navigate("MyChannel")}
          />
        </View> */}
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
  headerContent: {
    padding: 30,
    alignItems: "flex-start", // 상단바 캐릭터
    flexDirection: "row"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderColor: "white"
    // marginTop:30,
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
    marginTop: 5,
    color: "#696969" // 아이콘 텍스트
  }
});

// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Alert,
//   Button,
//   TouchableOpacity
// } from "react-native";
// import { MarqueeLabel } from "react-native-lahk-marquee-label";
// import { MarqueeHorizontal, MarqueeVertical } from "react-native-marquee-ab";
// import firebase from "firebase";
// import Icon from "react-native-vector-icons/Ionicons";

// export default class MyPageScreen extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.MarqueeLabel}>
//           <MarqueeLabel
//             style={styles.marqueeLabel}
//             duration={13000}
//             speed={250}
//             text="Router 공지사항 입니다 Router 공지사항 입니다 Router 공지사항 입니다 Router 공지사항 입니다 Router 공지사항 입니다 Router 공지사항 입니다"
//             textStyle={{
//               fontSize: 13,
//               color: "black",
//               fontWeight: "500"
//             }}
//           ></MarqueeLabel>
//         </View>

//         <View style={styles.header}>
//           <View style={styles.headerContent}>
//             <Image
//               style={styles.avatar}
//               source={{
//                 uri:
//                   "https://i.pinimg.com/564x/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.jpg"
//               }}
//             />

//             <View style={{ marginTop: 45, marginLeft: 15 }}>
//               <Text style={styles.name}>Helloworld2</Text>
//               <Text style={styles.email}>Helloworld2@gmail.com</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.Button}>
//           <Button title="충전하기" onPress={() => Alert.alert("충전페이지")} />
//         </View>
//         <View style={styles.body}>
//           <View style={styles.bodyContent}>
//             <TouchableOpacity
//               Onpress={() => this.props.navigation.navigate("MyChannel")}
//             >
//               <View style={styles.menuBox}>
//                 <Image
//                   style={styles.icon}
//                   source={{
//                     uri:
//                       "https://devitt-forand.com/wp-content/uploads/2018/05/person-icon.png"
//                   }}
//                 />
//                 <Text style={styles.info}>내 채널</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity Onpress={() => this.goToNextScreen()}>
//               <View style={styles.menuBox}>
//                 <Image
//                   style={styles.icon}
//                   source={{
//                     uri:
//                       "https://devitt-forand.com/wp-content/uploads/2018/05/person-icon.png"
//                   }}
//                 />
//                 <Text style={styles.info}>내 정보 수정</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity Onpress={() => this.goToNextScreen()}>
//               <View style={styles.menuBox}>
//                 <Image
//                   style={styles.icon}
//                   source={{
//                     uri:
//                       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0icr8neC2LBtRWa39puWKK6hwn3EBcufol55fXmVtgoCgg_tkQ"
//                   }}
//                 />
//                 <Text style={styles.info}>구독채널</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity Onpress={() => this.goToNextScreen()}>
//               <View style={styles.menuBox}>
//                 <Image
//                   style={styles.icon}
//                   source={{
//                     uri:
//                       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0icr8neC2LBtRWa39puWKK6hwn3EBcufol55fXmVtgoCgg_tkQ"
//                   }}
//                 />
//                 <Text style={styles.info}>알람</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity Onpress={() => this.goToNextScreen()}>
//               <View style={styles.menuBox}>
//                 <Image
//                   style={styles.icon}
//                   source={{
//                     uri:
//                       "http://www.pkicon.com/icons/13193/Black-Gift-Box-256.png"
//                   }}
//                 />
//                 <Text style={styles.info}>메시지</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity Onpress={() => this.goToNextScreen()}>
//               <View style={styles.menuBox}>
//                 <Image
//                   style={styles.icon}
//                   source={{
//                     uri:
//                       "https://postfiles.pstatic.net/MjAxOTEwMTVfMTA4/MDAxNTcxMTI1OTQ2NDU1.UdZp4TRqvw4w7sqJ9Ek_22jiDkJaXYs0MGoTKRwNs9Yg.2Ca4ES8_4JCU-cgiSGu0k3u_17xX5Ot4y6cjil9O6D4g.JPEG.operkop00/megaphone.jpg?type=w773"
//                   }}
//                 />
//                 <Text style={styles.info}>공지사항</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity Onpress={() => this.goToNextScreen()}>
//               <View style={styles.menuBox}>
//                 <Image
//                   style={styles.icon}
//                   source={{
//                     uri:
//                       "http://icons.iconarchive.com/icons/graphicloads/100-flat/256/phone-icon.png"
//                   }}
//                 />
//                 <Text style={styles.info}>고객센터</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity Onpress={() => this.goToNextScreen()}>
//               <View style={styles.menuBox}>
//                 <Image
//                   style={styles.icon}
//                   source={{
//                     uri:
//                       "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c17152c1-e3e6-425b-a192-250df05de8e0/dairhoj-e99c5ac0-06a9-45b2-9afe-50233848f75f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MxNzE1MmMxLWUzZTYtNDI1Yi1hMTkyLTI1MGRmMDVkZThlMFwvZGFpcmhvai1lOTljNWFjMC0wNmE5LTQ1YjItOWFmZS01MDIzMzg0OGY3NWYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BLO7tUFwteJxVTovxhWQBcgOWUs5Otr1u0aJAEu9RWQ"
//                   }}
//                 />
//                 <Text style={styles.info}>설정</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   headerContent: {
//     padding: 30,
//     alignItems: "flex-start", // 상단바 캐릭터
//     flexDirection: "row"
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 63,
//     borderColor: "white"
//     // marginTop:30,
//   },

//   name: {
//     fontSize: 24,
//     fontWeight: "600"
//   },

//   email: {
//     fontSize: 10
//   },

//   bodyContent: {
//     flex: 1,
//     alignItems: "center",
//     padding: 30
//   },
//   textInfo: {
//     fontSize: 18,
//     marginTop: 20,
//     color: "#000000"
//   },
//   bodyContent: {
//     paddingTop: 5,
//     flexDirection: "row",
//     alignItems: "center",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     alignContent: "center"
//   },

//   Button: {
//     width: 100,
//     marginLeft: 290
//   },

//   menuBox: {
//     width: 70,
//     height: 70,
//     alignItems: "center",
//     justifyContent: "center",
//     margin: 12,
//     elevation: 4
//   },

//   icon: {
//     width: 40,
//     height: 40 // 아이콘 사이즈
//   },
//   info: {
//     fontSize: 10,
//     marginTop: 5,
//     color: "#696969" // 아이콘 텍스트
//   },
//   MarqueeLabel: {
//     width: 380,
//     height: 40,
//     justifyContent: "center",
//     alignSelf: "center",
//     backgroundColor: "orange",
//     borderRadius: 6,
//     marginTop: 35
//     // borderWidth: 1.0,
//     // borderColor: '#FF3300',
//   }
// });

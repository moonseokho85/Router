import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Container, Content, Thumbnail } from "native-base";
import CardComponent from "../components/CardComponent";

import Icon from "react-native-vector-icons/Ionicons";

import firebase from "firebase";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: [
        {
          email: "tjrgh@naver.com",
          firstname: "Logan",
          lastname: "Moon",
          nickname: "Octopus",
          home_top_image:
            "https://cdn.pixabay.com/photo/2015/09/02/12/37/camera-918565__340.jpg",
          profile_image_url:
            "https://www.seoul.go.kr/res_newseoul/images/seoul/img_intro1.png",
          title: "유성천에 다녀왔어요",
          upload_image:
            "https://t1.daumcdn.net/cfile/tistory/99A7CC3E5B069D3624",
          description:
            "도나스를 사먹고 유성천 다리를 건너시면 본격적으로 유성시장으로 들어옵니다. 날이 좋으니 유성천 뷰가 참 좋네요. 다리는 도나스 가게 골목으로 나오시면 바로 있습니다."
        },
        {
          email: "clans@naver.com",
          firstname: "chimoon",
          lastname: "Song",
          nickname: "chichi",
          profile_image_url:
            "https://bootdey.com/img/Content/avatar/avatar2.png",
          title: "유성천에 다녀왔어요",
          upload_image:
            "https://t1.daumcdn.net/cfile/tistory/99A7CC3E5B069D3624",
          description:
            "도나스를 사먹고 유성천 다리를 건너시면 본격적으로 유성시장으로 들어옵니다. 날이 좋으니 유성천 뷰가 참 좋네요. 다리는 도나스 가게 골목으로 나오시면 바로 있습니다."
        },
        {
          email: "operkop00@naver.com",
          firstname: "kyungHae",
          lastname: "Kim",
          nickname: "kyungky",
          profile_image_url:
            "https://bootdey.com/img/Content/avatar/avatar3.png",
          title: "유성천에 다녀왔어요",
          upload_image:
            "https://t1.daumcdn.net/cfile/tistory/99A7CC3E5B069D3624",
          description:
            "도나스를 사먹고 유성천 다리를 건너시면 본격적으로 유성시장으로 들어옵니다. 날이 좋으니 유성천 뷰가 참 좋네요. 다리는 도나스 가게 골목으로 나오시면 바로 있습니다."
        },
        {
          email: "htmddus@naver.com",
          firstname: "seungyeon",
          lastname: "Song",
          nickname: "seungsg",
          profile_image_url:
            "https://bootdey.com/img/Content/avatar/avatar4.png",
          title: "유성천에 다녀왔어요",
          upload_image:
            "https://t1.daumcdn.net/cfile/tistory/99A7CC3E5B069D3624",
          description:
            "도나스를 사먹고 유성천 다리를 건너시면 본격적으로 유성시장으로 들어옵니다. 날이 좋으니 유성천 뷰가 참 좋네요. 다리는 도나스 가게 골목으로 나오시면 바로 있습니다."
        },
        {
          email: "gary@naver.com",
          firstname: "Gary",
          lastname: "Kim",
          nickname: "Garyga",
          profile_image_url:
            "https://bootdey.com/img/Content/avatar/avatar5.png",
          title: "유성천에 다녀왔어요",
          upload_image:
            "https://t1.daumcdn.net/cfile/tistory/99A7CC3E5B069D3624",
          description:
            "도나스를 사먹고 유성천 다리를 건너시면 본격적으로 유성시장으로 들어옵니다. 날이 좋으니 유성천 뷰가 참 좋네요. 다리는 도나스 가게 골목으로 나오시면 바로 있습니다."
        }
      ],
      fetchData: []
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} size={30} />
    )
  };

  componentDidMount() {

    var user = firebase.auth().currentUser;

    fetch("http://192.168.0.160:8080/react_native_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(user.providerData)
    });

    this._fetchData();

    console.log("---componentDidMount TEST---", this.state.fetchData);

    console.log("--componentDidMount fetchData--", this.state.fetchData.image_url);
  }

  _fetchData = () => {

    var user = firebase.auth().currentUser;

    var data = {
      email: user.email
    };

    fetch("http://192.168.0.160:8080/react_native_content_allselect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(resData => this.setState({ fetchData: resData }))
      .catch(error => console.log(error));
  };

  render() {
    var user = firebase.auth().currentUser;
    var i =0
    console.log("---confirming state---",i+1);

    return (
      <Container style={styles.container}>
        <Content>
          <View style={{ height: 100 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 7
              }}
            >
              <Text style={{ fontWeight: "bold" }}>구독 중</Text>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("SubscriptionList", {
                    Data: this.state.mockData
                  });
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name="md-play"
                    style={{ fontSize: 14, marginRight: 2 }}
                  ></Icon>
                  <Text style={{ fontSize: 14 }}>모두보기</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 3 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                  paddingStart: 5,
                  paddingEnd: 5
                }}
              >
                {this.state.mockData.map((Data, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() =>
                        this.props.navigation.navigate(`CreatorChannel`, {
                          email: Data.email,
                          firstname: Data.firstname,
                          lastname: Data.lastname,
                          nickname: Data.nickname,
                          profile_image_url: Data.profile_image_url,
                          title: Data.title,
                          upload_image: Data.upload_image,
                          description: Data.description,
                          nickname: Data.nickname,
                          home_top_image: Data.home_top_image
                        })
                      }
                    >
                      <Thumbnail
                        square
                        style={{
                          marginHorizontal: 5,
                          borderColor: "grey",
                          borderWidth: 2,
                          borderRadius: 10
                        }}
                        source={{ uri: Data.profile_image_url }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <View>
            {this.state.fetchData.map((Data, i) => {
              return (
                <CardComponent
                  key={i}
                  profile_image_url={user.photoURL}
                  title={Data.title}
                  // firstname = {this.state.firstname}
                  // lastname = {this.state.lastname}
                  upload_image={Data.image_url}
                  description={Data.contents}
                  onPressThumnail={() => {
                    this.props.navigation.navigate("");
                  }}
                  onPressContent={() => {
                    this.props.navigation.navigate("Detail");
                  }}
                  onPressReply={() => {
                    this.props.navigation.navigate("Reply");
                  }}
                />
              );
            })}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignContent : 'center',
    backgroundColor: "white"
  }
});

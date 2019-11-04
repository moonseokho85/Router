import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import SubscriptionListComponent from "../components/SubscriptionListComponent";

export default class SubscriptionListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  async componentDidMount() {
    await this.setState({
      dataSource: this.props.navigation.getParam("Data")
    });

    await this.setState({
      dataSource: [
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
      ]
    });

    await console.log(this.state.dataSource);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("CreatorChannel", {
                    email: item.email,
                    nickname: item.nickname,
                    profile_image_url: item.profile_image_url
                  });
                }}
              >
                <View style={{ flexDirection: "row", margin: 5 }}>
                  <Image
                    source={{ uri: item.profile_image_url }}
                    style={{
                      width: 75,
                      height: 75,
                      marginLeft: 10,
                      borderRadius: 10
                    }}
                  />
                  <View style={{ marginLeft: 5 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 25,
                        marginTop: 10
                      }}
                    >
                      {item.nickname}
                    </Text>
                    <Text>{item.email}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.email}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  }
});

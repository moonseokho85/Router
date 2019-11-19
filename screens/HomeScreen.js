import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  FlatList
} from "react-native";

import { Container, Content, Thumbnail } from "native-base";

import CardComponent from "../components/CardComponent";

import Icon from "react-native-vector-icons/Ionicons";

import firebase from "firebase";

import { withCollapsible } from "react-navigation-collapsible";

import * as _ from "lodash";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: [],
      isLoading: false,
      refreshing: false,
      Data: [],
      uniqueFollow: []
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} size={30} />
    )
  };

  async componentDidMount() {
    var user = firebase.auth().currentUser;

    fetch("http://34.82.57.148:8080/react_native_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(user.providerData)
    });

    await this._fetchData();

    var follower = this.state.Data.filter(item => {
      return item.follower.indexOf(`${user.email}`) != -1;
    });

    await this.setState({ following: follower });

    var unique = _.uniqBy(this.state.following, "id");

    await this.setState({ uniqueFollow: unique });
  }

  _fetchData = async () => {
    var user = firebase.auth().currentUser;

    var data = {
      email: user.email
    };

    this.setState({
      isLoading: true,
      refreshing: true,
      Data: [],
      following: []
    });

    await fetch("http://34.82.57.148:8080/react_native_content_allselect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(resData => this.setState({ Data: resData }))
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({ isLoading: false, refreshing: false });
      });
  };

  _ListHeaderComponent = () => {
    return (
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
                Data: this.state.uniqueFollow
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
            {this.state.uniqueFollow.map((Data, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    this.props.navigation.navigate(`CreatorChannel`, {
                      email: Data.id,
                      firstname: Data.firstname,
                      lastname: Data.lastname,
                      nickname: Data.nickname,
                      profile_image_url: Data.profile_url,
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
                    source={{ uri: Data.profile_url }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  };

  renderItem = ({ item }) => {
    var user = firebase.auth().currentUser;
    return (
      <CardComponent
        profile_image_url={item.profile_url}
        title={item.title}
        upload_image={item.image_file}
        description={item.contents}
        email={item.id}
        user={user.email}
        title_no={item.title_no}
        de_menu={item.de_menu}
        up_text={item.up_text}
        down_text={item.down_text}
        main_reple={item.main_reple}
        main_reple_nickname={item.main_reple_nickname}
        reple_count={item.reple_count}
        onPressThumnail={() => {
          this.props.navigation.navigate("CreatorChannel", {
            email: item.id,
            firstname: item.firstname,
            lastname: item.lastname,
            nickname: item.nickname,
            profile_image_url: item.profile_url,
            title: item.title,
            upload_image: item.upload_image,
            description: item.description,
            nickname: item.nickname,
            home_top_image: item.main_image_url
          });
        }}
        onPressContent={() => {
          this.props.navigation.navigate("Detail", {
            email: item.id,
            firstname: item.firstname,
            lastname: item.lastname,
            nickname: item.nickname,
            profile_image_url: item.profile_url,
            title: item.title,
            upload_image: item.image_file,
            description: item.description,
            nickname: item.nickname,
            home_top_image: item.main_image_url,
            content: item.contents
          });
        }}
        onPressReply={() => {
          this.props.navigation.navigate("Reply", {
            email: item.id,
            title_no: item.title_no,
            de_menu: item.de_menu
          });
        }}
      />
    );
  };

  render() {
    const { paddingHeight, animatedY, onScroll } = this.props.collapsible;
    return (
      <AnimatedFlatList
        style={{ flex: 1 }}
        data={this.state.Data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={{ paddingTop: paddingHeight }}
        scrollIndicatorInsets={{ top: paddingHeight }}
        onScroll={onScroll}
        // if you want to use 'onScroll' callback.
        // onScroll={Animated.event(
        //   [{nativeEvent: {contentOffset: {y: animatedY}}}],
        //   {useNativeDriver:true, listener:this.onScroll})}
        _mustAddThis={animatedY}
        ListHeaderComponent={this._ListHeaderComponent}
        refreshing={this.state.refreshing}
        onRefresh={this._fetchData}
      />
    );
  }
}

export default withCollapsible(HomeScreen, { iOSCollapsedColor: "red" });

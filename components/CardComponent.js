import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity
} from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Right,
  Button,
  Icon,
  Item,
  Input
} from "native-base";
import LikeButton from "./LikeButton";
import Slider from "./Slider";

export default class CardCompnent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      user: "",
      title_no: "",
      de_menu: "",
      comment: "",
      likes: this.props.up_text,
      unlikes: this.props.down_text,
      focused: false,
      contents: ""
    };
  }

  async componentDidMount() {
    this.setState({
      email: this.props.email,
      user: this.props.user,
      title_no: this.props.title_no,
      de_menu: this.props.de_menu
    });

    var splitLikes = this.state.likes.split("|");
    var countLikes = splitLikes.length - 1;
    var splitUnlikes = this.state.unlikes.split("|");
    var countUnlikes = splitUnlikes.length - 1;

    await this.setState({ likes: countLikes, unlikes: countUnlikes });
    var a = this.props.description;
    var a = a.match(/<p>([^</p>]+)<\/p>/g);
    console.log(a);
    if (a === null) {
      this.setState({ contents: this.props.description });
    } else {
      this.setState({ contents: a });
    }
  }

  _sendComment = () => {
    fetch("http://34.82.57.148:8080/react_native_replepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        user: this.state.user,
        title_no: this.state.title_no,
        de_menu: this.state.de_menu,
        comment: this.state.comment
      })
    }).then(this.setState({ comment: "" }));
  };

  render() {
    return (
      <Card>
        <CardItem>
          <Left>
            <TouchableOpacity onPress={this.props.onPressThumnail}>
              <Thumbnail
                square
                style={{
                  borderRadius: 10
                }}
                source={{ uri: this.props.profile_image_url }}
              />
            </TouchableOpacity>
            <Body>
              <Text>{this.props.nickname}</Text>
              <Text note style={{ fontSize: 10 }}>
                {this.props.createdate}
              </Text>
            </Body>
          </Left>
        </CardItem>

        <TouchableOpacity onPress={this.props.onPressContent}>
          <CardItem>
            <Body>
              <Text numberOfLines={1}>{this.props.title}</Text>
            </Body>
          </CardItem>
        </TouchableOpacity>

        <CardItem cardBody>
          <Slider images={this.props.upload_image} />
        </CardItem>

        <CardItem style={{ height: 50 }}>
          <Left>
            <Text>
              {this.state.likes} 좋아요 / {this.state.unlikes} 싫어요
            </Text>
          </Left>
          <Right>
            <LikeButton
              email={this.props.email}
              user={this.props.user}
              // title={this.props.title}
              title_no={this.props.title_no}
              de_menu={this.props.de_menu}
              up_text={this.props.up_text}
              down_text={this.props.down_text}
            />
          </Right>
        </CardItem>

        <TouchableOpacity onPress={this.props.onPressContent}>
          <CardItem>
            <Text numberOfLines={2}>{this.state.contents}</Text>
          </CardItem>
        </TouchableOpacity>

        <TouchableOpacity>
          <CardItem>
            <Text numberOfLines={2}>
              <Text style={{ fontWeight: "900" }}>
                {this.props.main_reple_nickname}
              </Text>
              {"  "}
              {this.props.main_reple}
            </Text>
          </CardItem>
        </TouchableOpacity>

        <Button
          transparent
          light
          style={{ height: 10, marginLeft: 20 }}
          onPress={this.props.onPressReply}
        >
          <Text style={{ fontSize: 10 }}>
            {this.props.reple_count}개 댓글 보기
          </Text>
        </Button>
        <Item>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 10,
              marginRight: 10
            }}
          >
            <Input
              style={{ width: 100 }}
              placeholder="댓글 달기"
              onChangeText={comment => {
                this.setState({ comment });
              }}
              value={this.state.comment}
              multiline={true}
              onFocus={() => {
                this.setState({ focused: true });
              }}
              clearButtonMode="always"
            />
            <TouchableOpacity>
              <Icon
                active
                name="swap"
                onPress={() => {
                  Alert.alert(
                    "확인",
                    "정말로 댓글을 남기시겠습니까?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => this._sendComment() }
                    ],
                    { cancelable: false }
                  );
                }}
              />
            </TouchableOpacity>
          </View>
        </Item>
      </Card>
    );
  }
}

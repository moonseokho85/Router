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
      focused: false
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

    await this.setState({ likes: countLikes });
    await this.setState({ unlikes: countUnlikes });
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
    })
      .then(res => res.json())
      .then(resData => this.setState({ fetchData: resData }))
      .catch(error => console.log(error));
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
              <Text>
                {this.props.firstname}
                {this.props.lastname}
              </Text>
              <Text note>Jan 21, 2019</Text>
            </Body>
          </Left>
        </CardItem>

        <TouchableOpacity onPress={this.props.onPressContent}>
          <CardItem>
            <Body>
              <Text>{this.props.title}</Text>
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
            <Text numberOfLines={3}>{this.props.description}</Text>
          </CardItem>
        </TouchableOpacity>

        <TouchableOpacity>
          <CardItem>
            <Text>
              <Text style={{ fontWeight: "900" }}>
                {this.props.main_reple_nickname}
              </Text>
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
          <Text style={{ fontSize: 10 }}>{this.props.reple_count}개 댓글 보기</Text>
        </Button>
        <Item>
          <View
            style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}
          >
            <Input
              style={{ width: 100 }}
              placeholder="댓글 달기"
              onChangeText={comment => {
                this.setState({ comment });
              }}
              multiline={true}
              onFocus={() => {
                this.setState({ focused: true });
              }}
            />
            <TouchableOpacity>
              <Icon
                active
                name="swap"
                onPress={() => {
                  this._sendComment();
                }}
              />
            </TouchableOpacity>
          </View>
        </Item>
      </Card>
    );
  }
}

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

const images = [
  "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
];

export default class CommunityCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      user: "",
      title_no: "",
      de_menu: "",
      comment: ""
    };
  }

  componentDidMount() {
    this.setState({
      email: this.props.email,
      user: this.props.user,
      title_no: this.props.title_no,
      de_menu: this.props.de_menu
    });
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
                {this.props.nickname}
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
          <CardItem>
            <Text numberOfLines={3}>
              {this.props.description}
            </Text>
          </CardItem>
        </TouchableOpacity>

        <CardItem cardBody>
          <Slider images={this.props.upload_image} />
        </CardItem>

        {/* <TouchableOpacity onPress={this.props.onPressContent}>
          <CardItem style={{ height: 50 }}>
            <Left>
              <Text>{this.props.likes} likes</Text>
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
              <Button transparent>
              <Icon name='ios-chatbubbles' style={{ color:'black' }}/>
            </Button>
            <Button transparent>
              <Icon name='ios-send' style={{ color:'black' }}/>
            </Button>
            </Right>
          </CardItem>

          
        </TouchableOpacity>

        <Button
          transparent
          light
          style={{ height: 10, marginLeft: 10 }}
          onPress={this.props.onPressReply}
        >
          <Text>댓글 보기</Text>
        </Button>
        <Item>
          <Input
            placeholder="댓글 달기"
            onChangeText={comment => {
              this.setState({ comment });
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
        </Item> */}
      </Card>
    );
  }
}

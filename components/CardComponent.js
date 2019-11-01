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

export default class CardCompnent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Reply: ""
    };
  }
  componentDidMount() {}

  _Reply = () => {};

  render() {
    return (
      <Card>
        <CardItem>
          <Left>
            <TouchableOpacity onPress={this.props.onPressThumnail}>
              <Thumbnail source={{ uri: this.props.profile_image_url }} />
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
          {/* <SliderBox images={this.props.upload_image} /> */}
          {/* <Image
              source={{ uri: this.props.upload_image }}
              style={{ height: 200, width: null, flex: 1 }}
            /> */}
        </CardItem>

        <TouchableOpacity onPress={this.props.onPressContent}>
          <CardItem style={{ height: 50 }}>
            <Left>
              <Text>{this.props.likes} likes</Text>
            </Left>
            <Right>
              <LikeButton />
              {/* <Button transparent>
              <Icon name='ios-chatbubbles' style={{ color:'black' }}/>
            </Button>
            <Button transparent>
              <Icon name='ios-send' style={{ color:'black' }}/>
            </Button> */}
            </Right>
          </CardItem>

          <CardItem>
            <Text numberOfLines={3}>
              <Text style={{ fontWeight: "900" }}>{this.props.nickname}</Text>
              {this.props.description}
            </Text>
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
            onChangeText={Reply => {
              this.setState({ Reply });
            }}
          />
          <Icon
            active
            name="swap"
            onPress={() => {
              // this._Reply();
              Alert.alert();
            }}
          />
        </Item>
      </Card>
    );
  }
}

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

          <CardItem cardBody>
            <Image
              source={{ uri: this.props.upload_image }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>

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

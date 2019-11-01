import React, {Component} from 'react'
import { View, StyleSheet, Image } from 'react-native'

import { Container, Content, Card, CardItem, Text, Thumbnail, Left, Body, Right, List, ListItem, Button } from 'native-base';

export default class ListComponent extends Component {
    render(){
        return(
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square large source = {{uri : this.props.upload_image}} />
                </Left>
                <Body>
                    <Text>{this.props.title}</Text>
                    <Text note numberOfLines={1}>{this.props.description}</Text>
                </Body>
                {/* <Right>
                  <Button transparent>
                    <Text>View</Text>
                  </Button>
                </Right> */}
            </ListItem>
        )
    }
}
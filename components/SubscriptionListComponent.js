import React, {Component} from 'react'
import { View, StyleSheet, Image } from 'react-native'

import { Container, Content, Card, CardItem, Text, Thumbnail, Left, Body, Right, List, ListItem, Button } from 'native-base';

export default class ListComponent extends Component {
    render(){
        return(
            <Container>
                <Content>
                    {/* <Card>
                        <CardItem style = {{height : 100}}>
                            <Left style = {{width : 25}}>
                                <Thumbnail square large source = {{uri : this.props.upload_image}} />
                            </Left>
                            <Body style = {{width : 75}}>
                                <Text>{this.props.title}</Text>
                                <Text note>{this.props.description}</Text>
                            </Body>
                            <Right style = {{width : null}}/>
                        </CardItem>
                    </Card> */}
                    <List>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square large source = {{uri : this.props.upload_image}} />
                            </Left>
                            <Body>
                                <Text>{this.props.nickname}</Text>
                                <Text note numberOfLines={1}>{this.props.email}</Text>
                            </Body>
                            {/* <Right>
                              <Button transparent>
                                <Text>View</Text>
                              </Button>
                            </Right> */}
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Header, Body, Content, Button, Root } from 'native-base';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'

import firebase from 'firebase'
firebase.auth().onAuthStateChanged(
    (user) => console.log("user")
)

const CustomDrawerContentComponent = (props) => (
    
    <Container>
      <Header style={{height : 200, backgroundColor : 'orange'}}>
        <Body style={{justifyContent : 'center', alignContent : 'center', alignItems : 'flex-start'}}>
          <Image
            style = {styles.drawerImage}
            source = {require('../assets/joker.png')}
          />
          <Text>Loganmoon</Text>
          <Text></Text>
        </Body>
      </Header>
      <Content>
        <DrawerNavigatorItems {...props} />
      </Content>
      <Button
        style = {{
          justifyContent : 'center'
        }}
        onPress = {() => firebase.auth().signOut()}
  
      >
        <Text>Sign out</Text>
      </Button>
    </Container>
  )

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    drawerImage : {
      height : 100,
      width : 100,
      borderRadius : 75,
      // justifyContent : 'center',
      // alignContent : 'center',
    }
  });

export default CustomDrawerContentComponent;
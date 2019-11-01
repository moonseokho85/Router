import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

export default class ChannelCommunityScreen extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-people' style={{ color: tintColor }} />
        )
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        // justifyContent : 'center',
        // alignContent : 'center'
    }
})

import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BottomStackNavigator from '../navigations/BottomTabNavigator'


export default class MainScreen extends Component {

    render() {
        return (
            <BottomStackNavigator />
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignContent : 'center',
        justifyContent : 'center'
    }
})

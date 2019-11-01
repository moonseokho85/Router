import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'

export default class Apploading extends Component {
    render() {
        return (
            <View style = { styles.container }>
                <ActivityIndicator size = 'large'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignContent : 'center'
    }
})

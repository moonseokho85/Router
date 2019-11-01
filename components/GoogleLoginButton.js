import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'

export default class GoogleLoginButton extends Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <TouchableOpacity onPress = {() => { this.props.onPress }}>
                <View style = {{ flexDirection : 'row', width : 300, height : 50, borderWidth : 1, borderRadius : 10 }}>
                    <Image 
                        source = {require('../assets/google_mark.jpg')}
                        style = {{ width : 40, height : 30, margin : 10 }}
                    />
                    <Text style = {{ fontSize : 20, fontWeight : 'bold', margin : 10 }}>
                        구글로 로그인
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

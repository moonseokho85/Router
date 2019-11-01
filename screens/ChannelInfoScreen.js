import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { Button } from 'native-base'

export default class ChannelInfoScreen extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-information-circle' style={{ color: tintColor }} />
        )
    }

    render() {
        return (
            <View style = {styles.container}>
                <View>
                    <Text>안녕하세요. 반갑습니다.</Text>
                    <Text>크리에이터 {this.props.nickname}의 채널에 오신것을 환영합니다.</Text>
                </View>
                <View>
                    <Text>가입일 : 2019.06.24</Text>
                </View>
                <View>
                    <Text>Twitter</Text>
                    <Text>Facebook</Text>
                    <Text>Youtube</Text>
                    <Text>Instagram</Text>
                </View>
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

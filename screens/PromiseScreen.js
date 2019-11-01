import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
 
export default class PromiseScreen extends Component {

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-cash' style={{color : tintColor}} size= {30} />
        )
    }

    render() {
        return (
            <View style={style.container}>
                <Text>PromiseTab</Text>
            </View>
        );
    }
}
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
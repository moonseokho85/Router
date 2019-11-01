import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux';


export default class LoadingScreen extends Component {

    componentDidMount(){
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(
            (user) => {
                // console.log(user)
                console.log('AUTH STATE CHANGED CALLED')
                if(user){
                    this.props.navigation.navigate('MainScreen', {
                        email : user.email
                    })
                } else {
                    this.props.navigation.navigate('LoginScreen')
                }
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size = 'large' />
            </View>
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
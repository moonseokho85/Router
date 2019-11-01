import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import ListComponent from '../components/ListComponent'
import { Container, Content, List } from 'native-base'

export default class ChannelContentListScreen extends Component {

    constructor(props){
        super(props)
        this.state = {

            fetchData : []

        }
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-list-box' style={{ color: tintColor }} />
        )
    }

    componentDidMount(){

        const sleep = ( milliseconds ) => {
            return new Promise( resolve => setTimeout(resolve, milliseconds) )
          }

        sleep(200).then(() => {this._fetchData()});

        console.log(this.state.fetchData);

    }

    _fetchData = () => {
            
        var data = {
            email: this.props.screenProps.email
        }
          
        fetch('http://192.168.0.160:8080/react_content_select' ,{
            method :'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then(resData => this.setState({fetchData: resData}))
        .catch(error => console.log(error))

    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {this.state.fetchData.map((Data, i) => {
                            return(
                                <TouchableOpacity key = {i}>
                                    <ListComponent 
                                        title = {Data.title}
                                        upload_image = {Data.convertedImg}
                                        description = {Data.description}
                                    />
                                </TouchableOpacity>
                            )            
                        })}
                    </List>
                </Content>
            </Container>
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

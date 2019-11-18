import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";

export default class SubscriptionListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  async componentDidMount() {
    await this.setState({ dataSource: this.props.navigation.getParam('Data') });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("CreatorChannel", {
                    email: item.id,
                    nickname: item.nickname,
                    profile_image_url: item.profile_url
                  });
                }}
              >
                <View style={{ flexDirection: "row", margin: 5 }}>
                  <Image
                    source={{ uri: item.profile_url }}
                    style={{
                      width: 75,
                      height: 75,
                      marginLeft: 10,
                      borderRadius: 10
                    }}
                  />
                  <View style={{ marginLeft: 5 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 25,
                        marginTop: 10
                      }}
                    >
                      {item.nickname}
                    </Text>
                    <Text>{item.id}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  }
});

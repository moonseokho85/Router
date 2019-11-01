import React, { Component } from "react";
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Image,
  View,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ListItem, SearchBar } from "react-native-elements";

export default class SearchScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-search" style={{ color: tintColor }} size={30} />
    )
  };

  constructor(Props) {
    super(Props);
    //    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      response: [
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar1.png",
          description: "서울"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar2.png",
          description: "대전"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar3.png",
          description: "User 3"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar4.png",
          description: "User 4"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar5.png",
          description: "User 5"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar6.png",
          description: "User 6"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar1.png",
          description: "User 7"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar2.png",
          description: "User 8"
        }
      ],
      query: "",
      list: [],
      dataSource: [],
      dataBackup: [],
      isLoading: true
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true });
    this.setState({
      dataBackup: this.state.response,
      dataSource: this.state.response,
      isLoading: false
    });
  };
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="검색"
        icon={({ type: "material" }, { color: "#86939e" }, { name: "search" })}
        clearIcon={({ color: "#86939e" }, { name: "close" })}
        round
        lightTheme
        value={this.state.query}
        onChangeText={text => this.filterList(text)}
      />
    );
  };

  filterList = text => {
    var newData = this.state.dataBackup;
    newData = this.state.dataBackup.filter(item => {
      const itemData = item.description.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      query: text,
      dataSource: newData // after filter we are setting users to new array
    });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View
        style={{
          justifyContent: "center"
          // alignSelf: "center"s
        }}
      >
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => this.goToNextScreen()}>
                <Image
                  source={{ uri: item.icon }}
                  style={{
                    margin: 10,
                    height: 150,
                    width: 150,
                    borderRadius: 10
                  }}
                />
              </TouchableOpacity>
            );
          }}
          columnWrapperStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

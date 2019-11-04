import React, { Component } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";

class ExpandableItemComponent extends Component {
  //Custom Component for the Expandable List
  constructor() {
    super();
    this.state = {
      //  아래 드롭다운 구간
      layoutHeight: 0
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0
        };
      });
    }
  }

  render() {
    return (
      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}
        >
          <View>
            <Text style={styles.dateText}>{this.props.item.date}</Text>
          </View>
          <Text style={styles.headerText}>{this.props.item.category_name}</Text>
          <View>
            <Image
              style={styles.Icon}
              source={{
                uri:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXiJJfihveolm8_Psu5EBxrw43HiNNzSdIJLx9DP9ESFiBqI4s"
              }}
            />
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: this.state.layoutHeight,
            overflow: "hidden"
          }}
        >
          {/*Content under the header of the Expandable List Item*/}
          {this.props.item.subcategory.map((item, key) => (
            //  기존 플랫리스트 구간
            <View key={key} style={styles.content}>
              <Image
                style={styles.banner}
                source={{ uri: this.props.item.url }}
              />
              <Text style={styles.text}>{item.val}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default class NoticeScreen extends Component {
  //Main View defined under this Class
  constructor() {
    super();
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = { listDataSource: CONTENT };
  }

  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    array[index]["isExpanded"] = !array[index]["isExpanded"];
    this.setState(() => {
      return {
        listDataSource: array
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.topHeading}>Expandable List View</Text> */}
        <ScrollView>
          {this.state.listDataSource.map((item, key) => (
            <ExpandableItemComponent
              key={item.category_name}
              onClickFunction={this.updateLayout.bind(this, key)}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

// 데이터
const CONTENT = [
  {
    isExpanded: false,
    date: "2019/10/29",
    category_name: "Router 사용안내 공지사항입니다",
    subcategory: [{ val: "내용" }],
    url:
      "http://www.3minlab.com/wp-content/uploads/2018/06/GettyImages-962589872.jpg"
  },
  {
    isExpanded: false,
    date: "2019/10/29",
    category_name: "공지사항 2",
    subcategory: [{ val: "테스트" }]
  },
  {
    isExpanded: false,
    date: "2019/10/29",
    category_name: "공지사항 3",
    subcategory: [{ val: "테스트2" }]
  },
  {
    isExpanded: false,
    date: "2019/10/29",
    category_name: "공지사항 4",
    subcategory: [{ val: "테스트3" }]
  },
  {
    isExpanded: false,
    date: "2019/10/29",
    category_name: "val 2값",
    subcategory: [{ val: "Sub Cat 10" }, { val: "Sub Cat 2" }]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },

  topHeading: {
    paddingLeft: 10,
    fontSize: 20
  },

  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE"
  },

  headerText: {
    fontSize: 16
  },

  dateText: {
    fontSize: 10,
    color: "gray"
  },

  text: {
    fontSize: 16,
    padding: 10,
    backgroundColor: "white"
  },

  content: {
    paddingLeft: 10,
    paddingRight: 10
  },

  banner: {
    margin: 10,
    height: 200,
    width: null
  },

  Icon: {
    height: 10,
    width: 10,
    alignSelf: "flex-end"
  }
});

// fetch = state로 변경해줘야함

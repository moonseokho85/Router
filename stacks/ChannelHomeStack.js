import { createStackNavigator } from "react-navigation-stack";
import ChannelHomeScreen from "../screens/ChannelHomeScreen";
import ReplyScreen from "../screens/ReplyScreen";

const ChannelHomeStack = createStackNavigator({
  홈: {
    screen: ChannelHomeScreen,

    navigationOptions: {
      header: null
    }
  },
  Reply: {
    screen: ReplyScreen,

    navigationOptions: {
      title: "댓글"
    }
  }
});

export default ChannelHomeStack;

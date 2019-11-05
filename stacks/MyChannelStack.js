import { createStackNavigator } from "react-navigation-stack";
import MyChTabNavigator from "../navigations/MyChTabNavigator";
import PostScreen from '../screens/PostScreen'
import { createAppContainer } from "react-navigation";

const MyChannelStack = createStackNavigator({
    Channel : {
        scrren : MyChTabNavigator
    },
    Post : {
        screen : PostScreen
    }
})

const MyChannelAppStack = createAppContainer(MyChannelStack)

export default MyChannelAppStack;
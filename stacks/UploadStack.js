import { createStackNavigator } from "react-navigation-stack";

import PostScreen from '../screens/PostScreen'
import GeoSearchScreen from '../screens/GeoSearchScreen'

const UploadStack = createStackNavigator({
    GeoSearch : {
        screen : GeoSearchScreen,
        navigationOptions : {
            header : null,
            title: '위치추가'
        }
    },
    Upload : {
        screen : PostScreen
    },
},{
    mode : 'modal',
    headerMode : 'none'
})

export default UploadStack;
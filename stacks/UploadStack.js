import { createStackNavigator } from "react-navigation-stack";

import PostScreen from '../screens/PostScreen'
import GeoSearchScreen from '../screens/GeoSearchScreen'

const UploadStack = createStackNavigator({
    GeoSearch : {
        screen : GeoSearchScreen,
        navigationOptions : {
            header : null
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
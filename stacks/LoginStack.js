import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import LoginInputScreen from "../screens/LoginInputScreen";
import RegisterUserScreen from "../screens/RegisterUserScreen";

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,

    navigationOptions: {
      header: null
    }
  },
  LoginInput: {
    screen: LoginInputScreen
  },
  Register: {
    screen: RegisterUserScreen
  }
});

export default LoginStack;

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import EmailInputScreen from '../screens/EmailInputScreen';
import PasswordInputScreen from '../screens/PasswordInputScreen';
import HomeScreen from '../screens/HomeScreen';

const StackNavigator = createStackNavigator(
  {
    IntroScreen: IntroScreen,
    LoginScreen: LoginScreen,
    EmailInputScreen: EmailInputScreen,
    PasswordInputScreen: PasswordInputScreen,
    HomeScreen: HomeScreen,
    // TouchAuthentication: TouchAuthentication,
    // SelectProfileScreen: SelectProfileScreen,
    // SetGoalScreen: SetGoalScreen,
    // CustomizeInterest: CustomizeInterest,
    // SelectGender: SelectGender,
  },
  {
    initialRouteName: 'IntroScreen',
    initialRouteName: 'LoginScreen',
    // initialRouteName: 'EmailInputScreen',
    // initialRouteName: 'PasswordInputScreen',
    // initialRouteName: 'HomeScreen',
  },
);

export default createAppContainer(StackNavigator);

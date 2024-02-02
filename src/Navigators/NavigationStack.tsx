import {createStackNavigator} from '@react-navigation/stack';
import {StackParamList} from './Stacks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export const Stack = createStackNavigator<StackParamList>();
export const BottomTab = createBottomTabNavigator<StackParamList>();

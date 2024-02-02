/* eslint-disable react/no-unstable-nested-components */
import React, {createContext} from 'react';

import {colors, typography} from '@Theme';
import {StyleSheet, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTab} from './NavigationStack';
import {Home, Profile} from '@Containers/main/Screens';

export const BottomTabBarContext = createContext({});

const BottomTabBarNavigator = ({route: {params}}: {route: {params?: any}}) => {
  const insets = useSafeAreaInsets();

  const titles = [
    {
      name: 'home',
      title: 'Posts',
    },
    {
      name: 'profile',
      title: 'My Profile',
    },
  ];

  return (
    <BottomTabBarContext.Provider value={params?.openTabName}>
      <BottomTab.Navigator
        initialRouteName={params?.initialActiveTab}
        tabBarOptions={{
          tabStyle: {justifyContent: 'center'}, // Center each tab item
        }}
        screenOptions={({route}) => ({
          headerShown: false,
          BottomTabBarHideOnKeyboard: true,
          tabBarIconStyle: {display: 'none'}, // Hide the icon
          tabBarInactiveTintColor: 'red',
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: ({focused}) => {
            const label = titles.find(item => item.name === route.name)?.title;

            return (
              <Text
                style={[
                  styles.textStyle,
                  {color: focused ? colors.primary : colors.gray80},
                ]}>
                {label}
              </Text>
            );
          },
        })}>
        <BottomTab.Screen name="home" component={Home} />
        <BottomTab.Screen name="profile" component={Profile} />
      </BottomTab.Navigator>
    </BottomTabBarContext.Provider>
  );
};

export default BottomTabBarNavigator;

const styles = StyleSheet.create({
  textStyle: {
    ...typography.content,
    textAlign: 'center',
    width: 90,
  },
});

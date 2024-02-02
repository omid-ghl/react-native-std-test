import React from 'react';
import {Stack} from '../../Navigators/NavigationStack';
import {Login, SignUp} from './Screens';

export const authNavigation = () => (
  <>
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="signUp" component={SignUp} />
  </>
);

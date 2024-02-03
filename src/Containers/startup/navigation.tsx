import React from 'react';
import {Stack} from '../../Navigators/NavigationStack';
import {Splash} from './Screens';

export const startUpNavigation = () => (
  <>
    <Stack.Screen name="splash" component={Splash} />
  </>
);

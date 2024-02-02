import React from 'react';
import {Stack} from '../../Navigators/NavigationStack';
import {CreatePost, Home} from './Screens';

export const mainNavigation = () => (
  <>
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="createPost" component={CreatePost} />
  </>
);

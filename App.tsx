import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import '@Translations';
import {ApplicationNavigator} from '@Navigators/ApplicationNavigator';
import {Provider} from 'react-redux';
import {store} from './src/Store';
import {AlertWrapper} from '@Commons';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ApplicationNavigator />
        <AlertWrapper />
        {/* <SnackBarService /> */}
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

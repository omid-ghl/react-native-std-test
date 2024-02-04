import {AppScreen} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import {TokenStorage, useLazyCheckUserQuery} from '@Services';
import {useLazyGetCategoriesQuery} from '@Services/modules/post';
import {setAccessToken, setUser} from '@Store/auth';
import {setCategories} from '@Store/categories';
import {colors, typography} from '@Theme';
import {MINIMUM_DELAY_MS} from '@constants/common';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';

const Splash: React.FC<StackScreenProps<StackParamList, 'splash'>> = ({
  navigation: {reset, getState: getNavigationState},
}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [checkUser] = useLazyCheckUserQuery();

  const [getCategories] = useLazyGetCategoriesQuery();

  const resetNavigationTo = useCallback(
    (name: keyof StackParamList) => {
      const navigationState = getNavigationState();

      reset({
        routes: [
          {
            name,
          },
        ],
      });
      SplashScreen.hide();
    },
    [getNavigationState, reset],
  );

  const prefetchCategories = useCallback(async () => {
    try {
      const categories = await getCategories({}).unwrap();
      if (categories) {
        dispatch(setCategories(categories));
      }
    } catch (error) {}
  }, [dispatch, getCategories]);

  const checkUserAndNavigate = useCallback(async () => {
    try {
      const userInfo = await checkUser().unwrap();
      dispatch(setUser(userInfo));
      prefetchCategories({});

      resetNavigationTo('tabBar');
      // dispatch(setAccessToken(userToken.));
    } catch (error: any) {
      dispatch(setAccessToken(null));
      if (error?.status === 401) {
        try {
          await TokenStorage.removeToken();
        } catch {}
      }
      resetNavigationTo('login');
    }
  }, [checkUser, dispatch, prefetchCategories, resetNavigationTo]);

  useEffect(() => {
    TokenStorage.getToken()
      .then(async accToken => {
        if (accToken && typeof accToken === 'string' && accToken.length > 4) {
          dispatch(setAccessToken(accToken));

          setTimeout(() => {
            checkUserAndNavigate();
          }, 100);
        } else {
          setTimeout(() => {
            resetNavigationTo('login');
          }, MINIMUM_DELAY_MS);
        }
        console.info('🔑 accToken :', accToken);
      })
      .catch(() => {
        // checkBasicsDataAndNavigate();
      });
  }, [checkUserAndNavigate, dispatch, resetNavigationTo]);

  return (
    <AppScreen style={styles.container}>
      <Text style={styles.textStyle}>Splash screen</Text>
      <ActivityIndicator color={colors.white} style={styles.loadStyle} />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadStyle: {marginTop: 40},
  textStyle: {...typography.huge, color: colors.white},
});

export default Splash;

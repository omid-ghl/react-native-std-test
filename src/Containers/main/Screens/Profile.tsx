import {AppScreen, Button} from '@Commons';
import {useAppSelector} from '@Hooks';
import {StackParamList} from '@Navigators/Stacks';
import {TokenStorage, api} from '@Services';
import {colors, typography} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {reset as resetAuthStore} from '@Store/auth';

const Profile: React.FC<StackScreenProps<StackParamList, 'profile'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async () => {
    setIsLoading(true);
    await TokenStorage.removeToken();
    dispatch(resetAuthStore());
    dispatch(api.util.resetApiState());
    navigation.reset({
      routes: [{name: 'splash'}],
    });
  }, [dispatch, navigation]);

  return (
    <AppScreen>
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <Image source={{uri: user?.image}} style={styles.profileImage} />
          <Text style={styles.profileName}>
            {user?.first_name + ' ' + user?.last_name}
          </Text>
        </View>

        <Button
          isLoading={isLoading}
          onPress={logout}
          title={t('log_out')}
          style={styles.logoutButton}
          textStyle={typography.content}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgContent,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: colors.gray10,
  },
  profileName: {
    marginTop: 60,
  },
  logoutButton: {
    width: 180,
    height: 36,
    backgroundColor: colors.red,
  },
});

export default Profile;

import {AppScreen, Button} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import {colors, typography} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, View} from 'react-native';

const Profile: React.FC<StackScreenProps<StackParamList, 'profile'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();

  return (
    <AppScreen>
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <Image
            source={{uri: 'https://picsum.photos/200/300'}}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{'johnDoe'}</Text>
        </View>

        <Button
          onPress={() => {}}
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
    backgroundColor: colors.gray30,
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

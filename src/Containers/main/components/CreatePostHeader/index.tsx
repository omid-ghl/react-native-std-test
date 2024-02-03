import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {SVG, colors, typography} from '@Theme';
import {ICreatePostHeader} from './CreatePostHeader';
import {useNavigation} from '@react-navigation/native';
import {dimensions} from '@Theme/Variables';
import {useTranslation} from 'react-i18next';

const CreatePostHeader = (props: ICreatePostHeader.IProps) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {} = props;

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <SVG.ArrowLeft />
      </TouchableOpacity>
      <Text style={styles.title}>{t('create_post')}</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: dimensions.width * 0.025,
  },
  backButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: colors.primary,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    ...typography.mid,
    color: colors.primary,
  },
  placeholder: {
    width: 35,
  },
});

export default CreatePostHeader;

import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {SVG, colors, fonts, typography} from '@Theme';
import {IPostCard} from './PostCard';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {verifyByUser} from '@Commons';
import Shadows from '@Theme/Shadows';

const PostCard = (props: IPostCard.IProps) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {title, description, id, category} = props;

  const handleDelete = useCallback(() => {
    verifyByUser({
      title: t('deleting_title'),
      actions: {
        onSuccess: {
          title: t('delete'),
          task: () => {},
        },
        onFailure: {
          title: t('cancel'),
          task: () => {},
        },
      },
    });
  }, [t]);

  return (
    <View key={id} style={styles.card}>
      <Image
        source={{uri: 'https://picsum.photos/200/300'}}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.type}>{t('Name')}</Text>
          <TouchableOpacity onPress={handleDelete}>
            <SVG.Trash />
          </TouchableOpacity>
        </View>
        <Text style={styles.descriptionStyle}>{title}</Text>
        <Text style={styles.type}>{t('description')}</Text>
        <Text style={styles.descriptionStyle}>{description}</Text>
        <Text style={styles.type}>{t('category')}</Text>
        <Text style={styles.descriptionStyle}>{category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 10,
    width: '95%',
    minHeight: 164,
    marginTop: 15,
    ...Shadows.shadow_5,
  },

  image: {
    flex: 0.5,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: colors.gray30,
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  type: {
    ...typography.minimal,
  },

  descriptionStyle: {
    ...typography.minimal,
    fontWeight: '400',
    fontFamily: fonts.regular,
  },
});

export default PostCard;

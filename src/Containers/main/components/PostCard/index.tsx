import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {SVG, colors, fonts, typography} from '@Theme';
import {IPostCard} from './PostCard';
import {useTranslation} from 'react-i18next';
import {verifyByUser} from '@Commons';
import Shadows from '@Theme/Shadows';
import {useDeletepostMutation} from '@Services/modules/post';

const PostCard = (props: IPostCard.IProps) => {
  const {t} = useTranslation();
  const {title, description, id, category, image} = props;

  const [
    deletePost,
    {isSuccess: deletePostIsSuccess, isLoading: deleting, data},
  ] = useDeletepostMutation();

  const handleDelete = useCallback(() => {
    verifyByUser({
      title: t('deleting_title'),
      actions: {
        onSuccess: {
          title: t('delete'),
          task: () => {
            deletePost({postId: id});
          },
        },
        onFailure: {
          title: t('cancel'),
          task: () => {},
        },
      },
    });
  }, [deletePost, id, t]);

  if (deletePostIsSuccess && data) {
    return;
  }

  return (
    <>
      <View key={id} style={[styles.card, {opacity: deleting ? 0.5 : 1}]}>
        <Image source={{uri: image}} style={styles.image} />
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
        {deleting && <ActivityIndicator style={styles.indicatorStyle} />}
      </View>
    </>
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
    backgroundColor: colors.gray10,
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
  indicatorStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 10,
  },
});

export default PostCard;

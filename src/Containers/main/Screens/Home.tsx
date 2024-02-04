import {AppScreen, Button} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import {SVG, colors, typography} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PostCard} from '../components';
import {useGetPostsQuery} from '@Services/modules/post';
import {Post} from '@Models';

const Home: React.FC<StackScreenProps<StackParamList, 'home'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();

  const gotoCreateNewPost = useCallback(() => {
    navigation.navigate('createPost');
  }, [navigation]);

  const {
    currentData: posts,
    isLoading: loadingPosts,
    isFetching: fetchingPosts,
    refetch: refetchPosts,
    isError: postsFailed,
  } = useGetPostsQuery({});

  const renderPostCard = useCallback(
    ({
      item: {
        title,
        description,
        id,
        category: {name},
        image,
      },
    }: {
      item: Post;
    }) => (
      <PostCard
        title={title}
        description={description}
        id={id}
        category={name}
        image={image}
      />
    ),
    [],
  );

  const renderFooter = () => {
    if (loadingPosts || fetchingPosts) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      );
    }
    return null;
  };

  const renderEmptyList = () => {
    if (postsFailed) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>Error loading posts</Text>
        </View>
      );
    } else if (!loadingPosts && posts?.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>No posts available</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <AppScreen style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={gotoCreateNewPost}
          title={t('new_post')}
          icon={<SVG.Plus style={styles.plusIcon} />}
          style={styles.newPostButton}
          textStyle={typography.content}
        />
      </View>

      <FlatList
        keyExtractor={item => JSON.stringify(item?.id)}
        renderItem={renderPostCard}
        contentContainerStyle={styles.flatListContainer}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList}
        onRefresh={refetchPosts}
        refreshing={fetchingPosts}
        data={posts}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgContent,
  },
  buttonContainer: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row-reverse',
    marginTop: 20,
    marginBottom: 25,
  },
  newPostButton: {
    width: 180,
    height: 36,
  },
  plusIcon: {
    marginRight: 5,
  },
  flatListContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  loadingContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  errorContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  errorMessage: {
    color: colors.error,
    fontSize: typography.body,
  },
  emptyContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  emptyMessage: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
});

export default Home;

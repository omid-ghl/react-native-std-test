import {AppScreen, Button} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import {SVG, colors, typography} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {PostCard} from '../components';

const data = [
  {
    id: '1',
    title: 'Item 1',
    description: 'Lorem Ipsum is simply dummy text of the ...',
    category: 'test',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: '2',
    title: 'Item 2',
    description: 'Lorem Ipsum is simply dummy text of the ...',
    category: 'test',
    image: 'https://picsum.photos/200/300',
  },
];

const Home: React.FC<StackScreenProps<StackParamList, 'home'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();

  const gotoCreateNewPost = useCallback(() => {
    navigation.navigate('createPost');
  }, [navigation]);

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
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item: {title, description, id, category}}) => (
          <PostCard
            title={title}
            description={description}
            id={id}
            category={category}
          />
        )}
        contentContainerStyle={styles.flatListContainer}
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
});

export default Home;

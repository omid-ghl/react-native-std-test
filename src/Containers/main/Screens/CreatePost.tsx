import {AppScreen, Button, DropDown, Input} from '@Commons';
import {ICreatePost, category} from '@Models';
import {StackParamList} from '@Navigators/Stacks';
import {SVG, colors} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import {useFormik} from 'formik';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import {CreatePostHeader} from '../components';
import {photoShooting, pickSingleImage} from '@Services/ImagePickerService';
import {useAppSelector} from '@Hooks';
import {useCreatePostMutation} from '@Services/modules/post';
import Toast from 'react-native-toast-message';

const CreatePost: React.FC<StackScreenProps<StackParamList, 'createPost'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const categories = useAppSelector(state => state.categories.categories);
  const [imageUri, setImageUri] = useState('');
  const [selectedValue, setSelectedvalue] = useState<category>();

  const [createPost, {isSuccess, isError, isLoading, data, error}] =
    useCreatePostMutation() as any;

  const PostValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        title: Yup.string().required(t('field_required')),
        description: Yup.string().required(t('field_required')),
      }),
    [t],
  );

  const performPost = (values: ICreatePost.FormState) => {
    createPost({
      title: values.title.trim(),
      description: values.description.trim(),
      image: imageUri,
      categoryId: selectedValue?.id,
    });
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isSuccess && data) {
      Toast.show({
        type: 'success',
        text1: 'new post create!',
        text2: `with this title : ${data.result.title}`,
      });
      navigation.goBack();
    }
  }, [data, isSuccess, navigation]);

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    isValid,
    touched,
    setErrors,
  } = useFormik<ICreatePost.FormState>({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: performPost,
    validationSchema: PostValidationSchema,
  });

  const choosePic = async () => {
    Alert.alert('Pick your image', '', [
      {
        text: 'Cancel',
      },
      {
        text: 'Camera',
        onPress: async () => {
          const result: any = await photoShooting();
          setImageUri(result?.assets[0]?.uri);
          console.log;
        },
      },
      {
        text: 'Libray',
        onPress: async () => {
          const result: any = await pickSingleImage();
          setImageUri(result?.assets[0]?.uri);
        },
      },
    ]);
  };

  return (
    <AppScreen style={styles.container}>
      <CreatePostHeader />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={choosePic}>
          {imageUri ? (
            <View style={styles.imageContainer}>
              <Image source={{uri: imageUri}} style={styles.imageStyle} />
            </View>
          ) : (
            <SVG.PlaceHolder />
          )}
        </TouchableOpacity>

        <Input
          onChangeText={handleChange('title')}
          value={values.title}
          wrapperStyle={styles.inputWrapper}
          placeholder={t('title')}
          touched={touched.title}
          error={errors.title}
        />
        <Input
          onChangeText={handleChange('description')}
          value={values.description}
          style={styles.inputWrapper2}
          placeholder={t('description')}
          touched={touched.description}
          error={errors.description}
          multiline
        />
        {/* <Input
          onChangeText={handleChange('category')}
          value={values.category}
          wrapperStyle={styles.inputWrapper}
          placeholder={t('category')}
          touched={touched.category}
          error={errors.category}
        /> */}
        <DropDown
          style={styles.mt20}
          options={categories}
          showingKey={'name'}
          onSelect={setSelectedvalue}
          placeholder="Select an option"
          selectedValue={selectedValue}
        />
        <Button
          isLoading={isLoading}
          // softDisable={!isValid}
          onPress={() => {
            handleSubmit();
          }}
          title={t('create')}
          style={styles.buttonStyle}
        />
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgContent,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    backgroundColor: colors.gray30,
    borderRadius: 10,
  },
  inputWrapper: {
    marginTop: 20,
  },
  buttonStyle: {
    marginTop: 40,
  },
  inputWrapper2: {
    marginTop: 20,
    height: 150,
  },
  imageStyle: {flex: 1, resizeMode: 'cover', borderRadius: 10},
  mt20: {
    marginTop: 20,
  },
});

export default CreatePost;

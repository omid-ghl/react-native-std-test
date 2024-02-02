import {AppScreen, Button, Input} from '@Commons';
import {ICreatePost} from '@Models';
import {StackParamList} from '@Navigators/Stacks';
import {colors} from '@Theme';
import {dimensions} from '@Theme/Variables';
import {StackScreenProps} from '@react-navigation/stack';
import {useFormik} from 'formik';
import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, StyleSheet, View} from 'react-native';
import * as Yup from 'yup';
import {CreatePostHeader} from '../components';
import Toast from 'react-native-toast-message';

const CreatePost: React.FC<StackScreenProps<StackParamList, 'createPost'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();

  const PostValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        title: Yup.string().required(t('field_required')),
        description: Yup.string().required(t('field_required')),
        category: Yup.string().required(t('field_required')),
      }),
    [t],
  );

  const performPost = useCallback((values: ICreatePost.FormState) => {
    Keyboard.dismiss();
  }, []);

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
      category: '',
    },
    onSubmit: performPost,
    validationSchema: PostValidationSchema,
  });

  return (
    <AppScreen style={styles.container}>
      <CreatePostHeader />
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer} />

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
        <Input
          onChangeText={handleChange('category')}
          value={values.category}
          wrapperStyle={styles.inputWrapper}
          placeholder={t('category')}
          touched={touched.category}
          error={errors.category}
        />
        <Button
          softDisable={!isValid}
          onPress={handleSubmit}
          title={t('create')}
          style={styles.buttonStyle}
        />
      </View>
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
    width: dimensions.width / 3,
    height: dimensions.width / 3,
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
});

export default CreatePost;

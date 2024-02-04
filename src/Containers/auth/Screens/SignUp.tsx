import {AppScreen, Button, Input} from '@Commons';
import {ISignUp} from '@Models';
import {StackParamList} from '@Navigators/Stacks';
import {useSignupMutation} from '@Services';
import {photoShooting, pickSingleImage} from '@Services/ImagePickerService';
// import {pickSingleImage} from '@Services/ImagePickerService';
import {SVG, colors, fonts, typography} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import {useFormik} from 'formik';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const SignUp: React.FC<StackScreenProps<StackParamList, 'signUp'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const [imageUri, setImageUri] = useState('');

  const [
    signUp,
    {
      isSuccess: signUpIsSuccess,
      isError: signUpIsError,
      isLoading: signUpIsLoading,
      data: signUpData,
      error: signUpErr,
    },
  ] = useSignupMutation() as any;

  const performSignUp = useCallback(
    (values: ISignUp.FormState) => {
      Keyboard.dismiss();
      signUp({
        email: values.email.trim(),
        password: values.password.trim(),
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        image: imageUri,
      });
    },
    [imageUri, signUp],
  );

  const SignUpValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        firstName: Yup.string().required(t('field_required')),
        lastName: Yup.string().required(t('field_required')),

        email: Yup.string()
          .required(t('req_email'))
          .matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            t('inv_email'),
          ),
        password: Yup.string()
          .required(t('req_password'))
          .min(6, t('inv_password')),
      }),
    [t],
  );

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    isValid,
    touched,
    setErrors,
  } = useFormik<ISignUp.FormState>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      image: '',
    },
    onSubmit: performSignUp,
    validationSchema: SignUpValidationSchema,
  });

  useEffect(() => {
    if (signUpErr?.data?.image) {
      Toast.show({
        type: 'error',
        text1: 'Some Error About Image!',
        text2: signUpErr?.data?.image,
      });
    }
    if (signUpIsError && signUpErr) {
      setErrors({
        firstName: signUpErr?.data?.first_name,
        lastName: signUpErr?.data?.last_name,
        password: signUpErr?.data?.password,
        email: signUpErr?.data?.email,
      });
    }
  }, [setErrors, signUpErr, signUpIsError]);

  const gotoLogin = useCallback(() => {
    navigation.navigate('login');
  }, [navigation]);

  useEffect(() => {
    if (signUpIsSuccess && signUpData?.message) {
      Toast.show({
        type: 'success',
        text1: '',
        text2: signUpData?.message,
      });
      navigation.navigate('login');
    }
  }, [navigation, signUpData?.message, signUpIsSuccess, values.email]);

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}>
        <View style={styles.containerStyle}>
          <Text style={styles.headerText}>{t('sign_up')}</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={choosePic}
            style={styles.imageWrapper}>
            {imageUri ? (
              <Image style={styles.imageStyle} source={{uri: imageUri}} />
            ) : (
              <SVG.Avatar style={styles.iconStyle} />
            )}
          </TouchableOpacity>
          <Input
            onChangeText={handleChange('firstName')}
            value={values.firstName}
            wrapperStyle={styles.inputWrapper}
            placeholder={t('first_name')}
            touched={touched.firstName}
            error={errors.firstName}
          />
          <Input
            onChangeText={handleChange('lastName')}
            value={values.lastName}
            wrapperStyle={styles.inputWrapper}
            placeholder={t('last_name')}
            touched={touched.lastName}
            error={errors.lastName}
          />
          <Input
            onChangeText={handleChange('email')}
            value={values.email}
            wrapperStyle={styles.inputWrapper}
            placeholder={t('email')}
            touched={touched.email}
            error={errors.email}
          />
          <Input
            onChangeText={handleChange('password')}
            value={values.password}
            wrapperStyle={styles.inputWrapper}
            placeholder={t('password')}
            touched={touched.password}
            error={errors.password}
          />
          <Button
            isLoading={signUpIsLoading}
            softDisable={!isValid}
            fullWidth
            onPress={handleSubmit}
            title={t('sign_up')}
            style={styles.buttonStyle}
          />
          <View style={styles.signupTextWrapper}>
            <Text style={styles.signupText}>{t('already_have_acc')}</Text>
            <TouchableOpacity onPress={gotoLogin}>
              <Text style={styles.signupLink}>{t('sign_in')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    ...typography.huge,
    color: colors.primary,
  },
  inputWrapper: {
    marginTop: 20,
  },
  checkBox: {
    marginTop: 25,
    marginBottom: 35,
  },
  signupTextWrapper: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    ...typography.content,
    fontFamily: fonts.bold,
  },
  signupLink: {
    ...typography.content,
    fontFamily: fonts.bold,
    marginLeft: 5,
    color: colors.primary,
  },
  buttonStyle: {marginTop: 40},
  iconStyle: {},
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 10000,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
});

export default SignUp;

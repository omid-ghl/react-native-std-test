import {AppScreen, Button, Input} from '@Commons';
import {ISignUp} from '@Models';
import {StackParamList} from '@Navigators/Stacks';
import {useSignupMutation} from '@Services';
import {SVG, colors, fonts, typography} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import {useFormik} from 'formik';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';

const SignUp: React.FC<StackScreenProps<StackParamList, 'signUp'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();

  const [
    signUp,
    {
      isSuccess: signUpIsSuccess,
      isError: signUpIsError,
      isUninitialized: signUpIsUnitialized,
      isLoading: signUpIsLoading,
      data: signUpData,
    },
  ] = useSignupMutation();

  const performSignUp = useCallback(
    (values: ISignUp.FormState) => {
      Keyboard.dismiss();
      signUp({
        email: values.email.trim(),
        password: values.password.trim(),
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
      });
    },
    [signUp],
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
    },
    onSubmit: performSignUp,
    validationSchema: SignUpValidationSchema,
  });

  const gotoLogin = useCallback(() => {
    navigation.navigate('login');
  }, [navigation]);

  useEffect(() => {
    // navigation.navigate('home', {
    //   email: values.email.trim(),
    // });
  }, [navigation, values.email]);

  return (
    <AppScreen style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}>
        <View style={styles.containerStyle}>
          <Text style={styles.headerText}>{t('sign_up')}</Text>
          <SVG.Avatar style={styles.iconStyle} />
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
          {/* <Input
            onChangeText={handleChange('email')}
            value={values.email}
            wrapperStyle={styles.inputWrapper}
            placeholder={t('Confirm Password')}
          /> */}
          <Button
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
  iconStyle: {marginTop: 30},
});

export default SignUp;

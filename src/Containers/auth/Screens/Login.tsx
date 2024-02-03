import {AppScreen, Button, CheckBox, Input} from '@Commons';
import {useAppDispatch} from '@Hooks';
import {ILogin} from '@Models';
import {StackParamList} from '@Navigators/Stacks';
import {TokenStorage, useLoginMutation} from '@Services';
import {setAccessToken, setRefreshToken, setUser} from '@Store/auth';
import {colors, fonts, typography} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import {useFormik} from 'formik';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
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

const Login: React.FC<StackScreenProps<StackParamList, 'login'>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [remembering, setRemembering] = useState(false);
  const [
    login,
    {
      isSuccess: loginIsSuccess,
      isError: loginIsError,
      isUninitialized: loginIsUnitialized,
      isLoading: loginIsLoading,
      data: loginData,
    },
  ] = useLoginMutation();

  console.log('loginDataloginData', loginData);

  const performLogin = useCallback(
    (values: ILogin.FormState) => {
      if (values.email.trim() && values.password.trim()) {
        Keyboard.dismiss();
        login({email: values.email.trim(), password: values.password.trim()});
      }
    },
    [login],
  );

  const LoginValidationSchema = useMemo(
    () =>
      Yup.object().shape({
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
  } = useFormik<ILogin.FormState>({
    initialValues: {
      email: 'example@gmail.com',
      password: 'Example11!',
    },
    onSubmit: performLogin,
    validationSchema: LoginValidationSchema,
  });

  const gotoSignUp = useCallback(() => {
    navigation.navigate('signUp');
  }, [navigation]);

  useEffect(() => {
    (async () => {
      if (loginIsSuccess) {
        if (loginData) {
          const accessToken = loginData?.token.access;
          const refreshToken = loginData?.token.refresh;
          const userData = loginData?.user;

          dispatch(setUser(userData));

          await TokenStorage.setToken(accessToken).then(() => {
            dispatch(setAccessToken(accessToken));
            dispatch(setRefreshToken(refreshToken));
          });
        }

        navigation.reset({
          routes: [
            {
              name: 'tabBar',
              params: {},
            },
          ],
        });
      }
    })();
  }, [dispatch, loginData, loginIsSuccess, navigation]);

  const checkBoxAction = () => {
    setRemembering(pre => !pre);
  };

  return (
    <AppScreen style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}>
        <View style={styles.containerStyle}>
          <Text style={styles.headerText}>{t('sign_in')}</Text>
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
            secureTextEntry
            touched={touched.password}
            error={errors.password}
          />
          <CheckBox
            style={styles.checkBox}
            isActive={remembering}
            onPress={checkBoxAction}
            title={t('remember_me')}
          />
          <Button
            isLoading={loginIsLoading}
            softDisable={!isValid}
            fullWidth
            onPress={handleSubmit}
            title={t('sign_in')}
          />
          <View style={styles.signupTextWrapper}>
            <Text style={styles.signupText}>{t('need_acc')}</Text>
            <TouchableOpacity onPress={gotoSignUp}>
              <Text style={styles.signupLink}>{t('sign_up')}</Text>
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
});

export default Login;

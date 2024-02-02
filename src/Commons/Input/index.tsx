import {colors, typography, variables} from '@Theme';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {IInput} from './IInput';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';

const Input = ({
  onKeyUp = () => {},
  onChangeText = () => {},
  placeholder = '',
  value,
  style,
  wrapperStyle,
  keyboardType,
  secureTextEntry = false,
  touched,
  error,
  multiline = false,
}: IInput.IProps) => {
  const hasErr = touched && error;

  const colorize = hasErr ? colors.darkError : colors.primary;
  const inputBgColor = hasErr ? colors.bgError : colors.white;

  return (
    <>
      <View style={wrapperStyle}>
        <TextInput
          onChangeText={onChangeText}
          style={[
            styles.textinputStyle,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              borderColor: colorize,
              backgroundColor: inputBgColor,
              textAlignVertical: multiline ? 'top' : 'center',
            },
            style,
          ]}
          value={value}
          returnKeyType="done"
          cursorColor={colorize}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
        />
        {hasErr && (
          <Animated.View
            entering={FadeInDown.duration(200)}
            exiting={FadeOutDown.duration(200)}>
            <Text style={styles.errTextStyle}>{error}</Text>
          </Animated.View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textinputStyle: {
    width: variables.dimensions.width * 0.95,
    borderWidth: 1,
    borderRadius: 15,
    height: 44,
    alignSelf: 'center',
    paddingHorizontal: 8,
  },
  errTextStyle: {
    marginTop: 4,
    marginLeft: 12,
    color: colors.darkError,
    ...typography.minimal,
  },
});

export default Input;

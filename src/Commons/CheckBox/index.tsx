import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ICheckBox} from '@Commons/CheckBox/CheckBox';
import {SVG, colors, typography} from '@Theme';

const CheckBox = (props: ICheckBox.IProps) => {
  const {
    onPress,
    isActive,
    title,
    type = 'square',
    style,
    onPressLinear,
    linearText,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.buttonStyle, style]}>
      <>
        <Text style={styles.textStyle}>{title}</Text>
        <View
          style={[
            styles.checkWrapp,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: isActive ? colors.primary : 'transparent',
            },
          ]}>
          {type === 'square' && (isActive ? <SVG.BareTick /> : <></>)}
        </View>
        <TouchableOpacity
          onPress={onPressLinear}
          activeOpacity={0.7}
          style={styles.lineButton}>
          <Text style={styles.linearText}>{linearText}</Text>
        </TouchableOpacity>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  textStyle: {
    ...typography.minimal,
    marginLeft: 8,
  },
  lineButton: {
    marginRight: 2,
  },
  linearText: {
    ...typography.minimal,
  },
  checkWrapp: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: colors.primary,
    borderWidth: 1,
  },
});

export default CheckBox;

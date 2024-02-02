import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {IButton} from '@Commons/Button/Button';
import {colors, typography} from '@Theme';

const Button = (props: IButton.IProps) => {
  const {
    onPress,
    title,
    type,
    style,
    isLoading,
    disable,
    textStyle,
    fullWidth = true,
    softDisable = false,
    icon,
  } = props;
  return (
    <TouchableOpacity
      disabled={disable || isLoading}
      activeOpacity={disable || isLoading ? 1 : 0.8}
      onPress={onPress}
      style={[
        styles.buttonStyle,
        fullWidth && styles.fullWidth,
        !fullWidth && styles.paddingHor,
        type === 'secondary' && styles.secondaryType,
        (disable || softDisable) && styles.halfOpacity,
        style,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <View style={styles.contentWrapper}>
          {icon}
          <Text
            style={[
              styles.textStyle,
              type === 'secondary' && {color: colors.primary},
              textStyle,
            ]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fullWidth: {width: '95%'},
  paddingHor: {paddingHorizontal: 10},
  buttonStyle: {
    height: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textStyle: {
    ...typography.title,
    color: colors.white,
  },
  secondaryType: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  contentWrapper: {flexDirection: 'row', alignItems: 'center'},
  halfOpacity: {opacity: 0.5},
});

export default Button;

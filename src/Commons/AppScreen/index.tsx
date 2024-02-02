import {colors} from '@Theme';
import Colors from '@Theme/Colors';
import React, {FC} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  fullScreen?: boolean;
}

export const AppScreen: FC<Props> = ({children, style, fullScreen = true}) => {
  const {top: statusBarHeight} = useSafeAreaInsets();

  const statusBarStyle = {
    height: fullScreen ? 0 : statusBarHeight,
    backgroundColor: Colors.white,
  } as ViewStyle;

  return (
    <View style={[styles.container, style]}>
      <View style={statusBarStyle} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

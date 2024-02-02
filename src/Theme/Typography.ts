import {StyleSheet} from 'react-native';
import fonts from './Fonts';

const typography = StyleSheet.create({
  huge: {
    fontWeight: '600',
    fontFamily: fonts.bold,
    fontSize: 30,
    lineHeight: 35.16,
  },
  mid: {
    fontWeight: '500',
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 24,
  },
  title: {
    fontWeight: '600',
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 18.75,
  },
  content: {
    fontWeight: '400',
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 16.41,
  },
  minimal: {
    fontWeight: '500',
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 14.06,
  },
});

export default typography;

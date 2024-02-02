import {ColorValue, KeyboardType, ViewStyle} from 'react-native';

declare namespace IInput {
  type IProps = {
    onKeyUp?: (val: string) => void;
    onChangeText?: (val: string) => void;
    placeholder?: string;
    value?: string;
    style?: ViewStyle;
    wrapperStyle?: ViewStyle;
    keyboardType?: KeyboardType;
    colorize?: ColorValue;
    secureTextEntry?: boolean;
    touched?: boolean;
    error?: string;
    multiline?: boolean;
  };
}

export {IInput};

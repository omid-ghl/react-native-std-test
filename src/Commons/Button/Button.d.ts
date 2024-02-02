import {ReactNode} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

declare namespace IButton {
  interface IProps {
    onPress: () => void;
    title: string;
    type?: 'primary' | 'secondary';
    style?: StyleProp<ViewStyle>;
    isLoading?: boolean;
    disable?: boolean;
    isSuccess?: boolean;
    textStyle?: StyleProp<TextStyle>;
    fullWidth?: boolean;
    softDisable?: boolean;
    icon?: ReactNode;
  }
}

export {IButton};

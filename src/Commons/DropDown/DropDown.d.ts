import {ViewStyle} from 'react-native';

declare namespace IDropDown {
  interface IProps {
    options;
    onSelect;
    placeholder;
    selectedValue;
    showingKey?: string;
    style?: ViewStyle;
  }
}

export {IDropDown};

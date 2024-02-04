import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {SVG, colors, fonts, typography, variables} from '@Theme';
import {IDropDown} from './DropDown';

const DropDown = (props: IDropDown.IProps) => {
  const {options, onSelect, placeholder, selectedValue, showingKey, style} =
    props;

  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleSelect = item => {
    onSelect(item);
    toggleDropdown();
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Text style={styles.selectedValue}>
          {(showingKey && selectedValue
            ? selectedValue?.[showingKey]
            : selectedValue) || placeholder}
        </Text>
        <SVG.ArrowDown
          style={[
            styles.arrowIcon,
            {transform: [{rotate: isVisible ? '180deg' : '0deg'}]},
          ]}
        />
      </TouchableOpacity>

      {isVisible && (
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            keyExtractor={item => item.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={styles.dropdownItem}>
                <Text>{showingKey ? item[showingKey] : item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  dropdownButton: {
    borderWidth: 1,
    borderRadius: 15,
    height: 44,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    width: variables.dimensions.width * 0.95,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedValue: {
    ...typography.content,
    fontFamily: fonts.regular,
  },
  arrowIcon: {
    marginLeft: 8,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    position: 'absolute',
    zIndex: 10,
    borderRadius: 10,
  },
  dropdownItem: {
    width: variables.dimensions.width * 0.95,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray10,
  },
});

export default DropDown;

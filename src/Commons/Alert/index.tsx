/* eslint-disable @typescript-eslint/no-shadow */
// Because with same name parameters , code is most readable

import {colors, typography} from '@Theme';
import {dimensions} from '@Theme/Variables';
import React, {useEffect, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Button from '../Button';
import {IAlert} from './Alert';

let verifyByUser: (details: IAlert.IProps) => void = () => {};
let actionsInitialValue = {
  onSuccess: {
    title: '',
    task: () => {},
  },
  onFailure: {
    title: '',
    task: () => {},
  },
};

const AlertWrapper = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [actions, setActions] = useState(actionsInitialValue);

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onSucessPressed = () => {
    actions.onSuccess.task();
    closeModal();
  };

  const onFailurePressed = () => {
    actions.onFailure.task();
    closeModal();
  };

  verifyByUser = ({title, description, actions}: IAlert.IProps): void => {
    if (title && actions) {
      setTitle(title);
      setActions(actions);
      showModal();
    }
    setDescription(description ?? '');
  };

  useEffect(() => {
    if (title) {
      showModal();
    } else {
      closeModal();
    }
  }, [title]);

  return (
    <Modal
      style={styles.modalWrapperStyle}
      animationType="fade"
      transparent={true}
      visible={modalVisible}>
      <Pressable style={styles.backgroundWrapper} onPress={closeModal} />
      <View style={styles.alertWrapper}>
        <Text style={styles.titleStyle}>{title}</Text>
        {!!description && (
          <Text style={styles.subtitleStyle}>{description}</Text>
        )}
        <Button
          onPress={onSucessPressed}
          title={actions.onSuccess.title}
          style={styles.acceptButtonStyle}
          textStyle={styles.acceptButtonTextStyle}
        />
        {actions.onFailure.title && (
          <Button
            textStyle={styles.declineButtonText}
            onPress={onFailurePressed}
            title={actions.onFailure.title}
            style={styles.declineButton}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapperStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  backgroundWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  alertWrapper: {
    width: dimensions.width * 0.9,
    backgroundColor: colors.white,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1000,
    top: dimensions.height / 4,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },
  titleStyle: {textAlign: 'center', ...typography.mid},
  acceptButtonTextStyle: {...typography.content, color: colors.white},

  subtitleStyle: {
    textAlign: 'right',
    marginTop: 12,
  },
  acceptButtonStyle: {
    width: dimensions.width * 0.35,
    backgroundColor: colors.red,
    marginTop: 46,
    height: 36,
  },
  declineButton: {
    width: dimensions.width * 0.35,
    backgroundColor: colors.white,
    borderRadius: 15,
    marginTop: 10,
  },
  declineButtonText: {...typography.content, color: colors.black},
});
export {AlertWrapper, verifyByUser};

/**
 * @format
 */
import React from 'react';
import {Button, Modal, VStack, HStack, Text} from 'native-base';
import {AppTheme} from 'theme';

type IProps = {
  open: boolean;
  message: JSX.Element | undefined;
  title: JSX.Element | undefined;
  submitLabel: string;
  cancelLabel: string;
  handleCancel: () => void;
  handleConfirm: () => void;
  handleClose: () => void;
  theme: AppTheme;
};

function CustomConfirmModal(props: IProps) {
  const {
    open,
    message,
    title,
    submitLabel,
    cancelLabel,
    handleCancel,
    handleClose,
    handleConfirm,
    theme,
  } = props;

  return (
    <Modal isOpen={open} size="lg" onClose={handleClose}>
      <Modal.Content backgroundColor={theme.colors.text[900]} maxWidth="350">
        {title && (
          <>
            <Modal.CloseButton onPress={handleClose} />
            <Modal.Header
              backgroundColor={theme.colors.text[900]}
              color={theme.colors.reverseText[900]}>
              {title}
            </Modal.Header>
          </>
        )}
        <Modal.Body backgroundColor={theme.colors.text[900]}>
          <VStack pt={!title ? 3 : 0} space={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">{message}</Text>
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer backgroundColor={theme.colors.text[900]}>
          <Button.Group>
            <Button
              backgroundColor={theme.colors.text[900]}
              onPress={handleCancel}>
              <Text color={theme.colors.reverseText[900]}>{cancelLabel}</Text>
            </Button>
            <Button
              backgroundColor={theme.colors.text[900]}
              onPress={handleConfirm}>
              <Text color={theme.colors.reverseText[900]}>{submitLabel}</Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export {CustomConfirmModal};

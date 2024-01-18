/**
 * @format
 */
import React from 'react';
import {CloseIcon, IInputProps, View} from 'native-base';

import {SafeTouchable, TextField} from 'components';
import {useAppTheme} from 'theme';

interface Props extends IInputProps {
  showClear: boolean;
  onClearPress?: () => void;
}

function SearchInput(props: Props) {
  const {showClear, onClearPress, ...rest} = props;
  const {colors} = useAppTheme();

  return (
    <View mb={1} px={2}>
      <TextField
        backgroundColor={colors.frame[900]}
        borderColor={colors.gray[800]}
        borderRadius="5px"
        borderStyle="solid"
        borderWidth={1}
        fontSize="16px"
        leftElement={
          <View pl={3} pr={2}>            
          </View>
        }
        placeholder="Search"
        placeholderTextColor={colors.gray[800]}
        rightElement={
          showClear ? (
            <View pr={3}>
              <SafeTouchable onPress={onClearPress}>
                <CloseIcon />
              </SafeTouchable>
            </View>
          ) : undefined
        }
        size="xl"
        variant="rounded"
        {...rest}
      />
    </View>
  );
}

SearchInput.defaultProps = {
  onClearPress: undefined,
};

export {SearchInput};

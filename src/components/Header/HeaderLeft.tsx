/**
 * @format
 */
import React from 'react';
import {ChevronLeftIcon, View} from 'native-base';

import {useAppTheme} from 'theme';

import {SafeTouchable} from '../SafeTouchable';

interface IHeaderLeftProps {
  onPress?: () => void;
}

function HeaderLeft(props: IHeaderLeftProps) {
  const {onPress} = props;

  const theme = useAppTheme();

  return (
    <View height="30px" justifyContent="center" width="30px">
      <SafeTouchable activeOpacity={0.9} onPress={onPress}>
        <ChevronLeftIcon color={theme.colors.gray[650]} size={25} />
      </SafeTouchable>
    </View>
  );
}

HeaderLeft.defaultProps = {
  onPress: null,
};

export {HeaderLeft};

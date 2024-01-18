import React from 'react';
import {ITextProps} from 'native-base';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

import {Text} from '../Typography';

interface Props extends ITextProps {
  text: string;
  colors?: string[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
}

function GradientText(props: Props) {
  const {
    text,
    colors,
    start = {x: 0, y: 1},
    end = {x: 1, y: 1},
    ...rest
  } = props;

  return (
    <MaskedView maskElement={<Text backgroundColor="transparent">{text}</Text>}>
      <LinearGradient colors={colors} end={end} start={start}>
        <Text opacity={0} {...rest}>
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}

GradientText.defaultProps = {
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
  colors: ['#2998C9', '#1E44BB'], // '#F2632F', '#A4F63C'
};

export {GradientText};

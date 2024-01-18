/**
 * @format
 */
import React from 'react';
import {View} from 'native-base';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';

import LinearGradient from 'react-native-linear-gradient';
import {AppTheme} from 'theme';
import {ViewStyleProps} from 'constants';

interface Props extends IViewProps {
  colors?: string[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  children?: JSX.Element | JSX.Element[] | undefined;
  style?: ViewStyleProps;
  theme: AppTheme;
}

function GradientBorderView(props: Props) {
  const {theme, children, colors, start, end, style, ...rest} = props;

  return (
    <LinearGradient colors={colors} end={end} start={start} style={style}>
      <View
        backgroundColor={theme.colors.primary[900]}
        flex={1}
        margin={0.5}
        overflow="hidden"
        {...rest}>
        {children}
      </View>
    </LinearGradient>
  );
}

GradientBorderView.defaultProps = {
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
  colors: ['#2998C9', '#1E44BB', '#F2632F', '#A4F63C'],
  style: undefined,
  children: undefined,
};

export {GradientBorderView};

/**
 * @format
 */
import React from 'react';
import {View, ITextProps} from 'native-base';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';

import {useAppTheme} from 'theme';
import {Text} from 'components';

interface IHeaderTitleProps extends IViewProps {
  title?: string;
  LeftElement?: JSX.Element | JSX.Element[] | undefined;
  RightElement?: JSX.Element | JSX.Element[] | undefined;
  render?: JSX.Element | JSX.Element[] | undefined;
  titleTextProps?: ITextProps;
}

const maxLength = 30;

function HeaderTitle(props: IHeaderTitleProps) {
  const {title, LeftElement, RightElement, render, titleTextProps, ...others} =
    props;

  const theme = useAppTheme();

  if (render) {
    return <View {...others}>{render}</View>;
  }

  const displayTitle =
    title && title.length >= maxLength
      ? `${title.slice(0, maxLength)}...`
      : title;

  const centerFlex = 1 - (LeftElement ? 0.2 : 0) - (RightElement ? 0.2 : 0);

  return (
    <View flexDirection="row" {...others} minWidth="250px">
      {LeftElement && <View flex={0.2}>{LeftElement}</View>}
      <View alignItems="center" flex={centerFlex} justifyContent="center">
        <Text
          color={theme.colors.text[900]}
          fontSize="22px"
          {...titleTextProps}>
          {displayTitle}
        </Text>
      </View>
      {RightElement && <View flex={0.2}>{RightElement}</View>}
    </View>
  );
}

HeaderTitle.defaultProps = {
  title: '',
  LeftElement: undefined,
  RightElement: undefined,
  render: undefined,
  titleTextProps: undefined,
};

export {HeaderTitle};

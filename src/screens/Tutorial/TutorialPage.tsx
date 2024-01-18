/**
 * @format
 */
import React, { useEffect } from 'react';
import {View, Image} from 'native-base';

import {Text} from 'components';
import {isAndroid, SCREEN_WIDTH, STATUSBAR_HEIGHT} from 'constants';
import {AppTheme, fontFamily} from 'theme';

interface Props {
  theme: AppTheme;
  image: number;
  title: string;
  subTitle: string;
}

const IMAGE_SIZE = SCREEN_WIDTH*0.75;

function TutorialPage(props: Props) {
  const {theme, title, subTitle, image} = props;

  return (
    <View alignItems="center" flex={0.75} justifyContent="space-around" paddingTop={isAndroid ? 0 : STATUSBAR_HEIGHT+50}>
      <View maxWidth="85%">
        <Text
          alignSelf="center"
          color={theme.colors.black[800]}
          fontFamily={fontFamily.semiBold}
          fontSize="28px"
          lineHeight={34.13}
          textAlign="center">
          {title}
        </Text>
      </View>
      <Image
        alt={title}
        height={IMAGE_SIZE}
        resizeMode="contain"
        source={image}
        width={IMAGE_SIZE}
      />
      <View maxWidth="80%">
        <Text
          color={theme.colors.text[700]}
          fontSize="16px"
          lineHeight="22.5px"
          px={4}
          textAlign="center">
          {subTitle}
        </Text>
      </View>
    </View>
  );
}

export {TutorialPage};

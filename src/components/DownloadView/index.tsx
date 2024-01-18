/**
 * @format
 */
import React from 'react';
import {ViewStyle} from 'react-native';
import {View} from 'native-base';
import ViewShot from 'react-native-view-shot';
import {useTranslation} from 'react-i18next';

import {Text, ProgressImage} from 'components';
import {SCREEN_HEIGHT, SCREEN_WIDTH, ViewStyleProps} from 'constants';
import {useAppTheme} from 'theme';

interface Props {
  image: string;
  title: string;
}

const WIDTH = 1080 / 3;
const HEIGHT = 1907 / 3;

const viewShotStyle: ViewStyle = {
  width: WIDTH,
  height: HEIGHT,
  position: 'absolute',
  // left: __DEV__ ? 0 : -SCREEN_WIDTH * 2,
  // top: __DEV__ ? 0 : -SCREEN_HEIGHT * 2,
  left: -SCREEN_WIDTH * 2,
  top: -SCREEN_HEIGHT * 2,
};

export type IDownloadHandler = {
  downloadImage?: (uri: string) => void;
};

const DownloadView = React.forwardRef<IDownloadHandler, Props>(
  (props: Props, ref) => {
    const {image, title} = props;

    const theme = useAppTheme();
    const {t} = useTranslation();

    const blurStyle: ViewStyleProps = {
      position: 'absolute',
      height: HEIGHT,
      width: WIDTH,
      left: 0,
      right: 0,
    };

    return (
      <ViewShot
        options={{fileName: title, format: 'jpg', quality: 1}}
        ref={ref}
        style={viewShotStyle}>
        <View
          alignSelf="center"
          backgroundColor={theme.colors.frame[900]}
          height={HEIGHT}
          left={0}
          position="absolute"
          right={0}
          width={WIDTH}>
          <ProgressImage
            bottom={0}
            key={image}
            left={0}
            position="absolute"
            right={0}
            source={{uri: image}}
            top={0}
          />
          <View
            backgroundColor={theme.colors.frame[900]}
            opacity={80}
            style={blurStyle}
          />
          <View
            borderColor={theme.colors.white[900]}
            borderRadius={10}
            borderWidth={1}
            bottom={4}
            left={2}
            position="absolute"
            right={2}
            top={4}>
            <View
              borderColor={theme.colors.white[900]}
              borderRadius={10}
              borderWidth={1}
              bottom={10}
              left={4}
              overflow="hidden"
              position="absolute"
              right={4}
              top={10}>
              <ProgressImage
                bottom={1}
                key={image}
                left={1}
                position="absolute"
                right={1}
                source={{uri: image}}
                top={1}
              />
            </View>
            <View flexDirection="row" left={4} top={1}>
              <View
                alignItems="center"
                backgroundColor={theme.colors.primary[900]}
                justifyContent="center"
                mr={2}
                rounded="sm"
                size="32px">
                <Text
                  fontSize="8px"
                  fontWeight="bold"
                  numberOfLines={2}
                  textAlign="center">
                  {t('shareDownload.appName.nextLine')}
                </Text>
              </View>
              <View>
                <Text fontSize="sm" fontWeight="bold" lineHeight="xs">
                  {t('shareDownload.appName.plain')}
                </Text>
                <Text fontSize="sm" lineHeight="xs">
                  {t('shareDownload.app')}
                </Text>
              </View>
            </View>
            {title && (
              <Text
                alignSelf="center"
                bottom={2}
                fontSize="lg"
                position="absolute">
                "{title}"
              </Text>
            )}
            <Text
              alignSelf="center"
              fontSize="12px"
              fontWeight="bold"
              position="absolute"
              right={5}
              top={5}>
              {t('shareDownload.smallTitle')}
            </Text>
          </View>
        </View>
      </ViewShot>
    );
  },
);

export {DownloadView};

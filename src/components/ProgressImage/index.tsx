/**
 * @format
 */
import React from 'react';
import {ActivityIndicator, ImageRequireSource, StyleSheet} from 'react-native';
import {View} from 'native-base';
import {createImageProgress} from 'react-native-image-progress';
import FastImage, {
  FastImageProps,
  ResizeMode,
  Source,
} from 'react-native-fast-image';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';

const Image = createImageProgress(FastImage);

interface Props extends IViewProps {
  resizeMode?: ResizeMode | undefined;
  source?: Source | ImageRequireSource;
  imageProps?: FastImageProps;
}

function ProgressImageView(props: Props) {
  const {resizeMode, source, imageProps, ...rest} = props;

  const fromWeb = typeof source !== 'number';

  const imgSource = fromWeb ? source : {uri: (source as Source).uri};

  const indicator = () => <ActivityIndicator />;

  const key = fromWeb ? imgSource?.uri : `local-image-${imgSource}`;

  return (
    <View
      alignItems="center"
      borderRadius={4}
      justifyContent="center"
      key={key}
      overflow="hidden"
      {...rest}>
      <Image
        indicator={indicator}
        key={`image-${key}`}
        resizeMode={resizeMode}
        source={imgSource}
        style={styles.image}
        {...imageProps}
      />
    </View>
  );
}

ProgressImageView.defaultProps = {
  source: undefined,
  resizeMode: 'cover',
  imageProps: undefined,
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

const ProgressImage = React.memo(ProgressImageView, (p, n) => p !== n);

export {ProgressImage};

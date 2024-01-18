/**
 * @format
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import {Placeholder, PlaceholderLine, Progressive, Fade} from 'rn-placeholder';

import {SCREEN_WIDTH} from 'constants';
import {useAppTheme, useAppThemeName} from 'theme';

const itemWidth = SCREEN_WIDTH / 2 - 4;

const boxSize = itemWidth - 20;
const imageSize = itemWidth - 40;

function KeywordItemPlaceholder() {
  const theme = useAppTheme();
  const selectedTheme = useAppThemeName();

  const Animation = selectedTheme === 'dark' ? Progressive : Fade;

  const bgColor =
    selectedTheme === 'dark' ? theme.colors.gray[900] : theme.colors.gray[650];

  return (
    <View mb={2} width={itemWidth}>
      <View
        borderColor={theme.colors.black[800]}
        borderRadius={4}
        borderWidth={1}
        size={boxSize}>
        <Placeholder Animation={Animation} style={styles.placeHolder}>
          <View alignItems="center" mx={2} size={imageSize}>
            <PlaceholderLine
              height={imageSize}
              style={[styles.image, {backgroundColor: bgColor}]}
            />
          </View>
        </Placeholder>
      </View>
      <Placeholder Animation={Animation}>
        <PlaceholderLine
          style={[styles.text, {backgroundColor: bgColor}]}
          width={50}
        />
      </Placeholder>
    </View>
  );
}

const styles = StyleSheet.create({
  placeHolder: {
    width: boxSize,
    height: boxSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 4,
    alignSelf: 'center',
  },
  text: {
    borderRadius: 0,
    marginTop: 6,
    height: 20,
  },
});

KeywordItemPlaceholder.defaultProps = {
  onPress: undefined,
};

export {KeywordItemPlaceholder};

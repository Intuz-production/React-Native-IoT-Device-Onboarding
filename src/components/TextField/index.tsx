import {
  Box,
  FormControl,
  IInputProps,
  Input,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';
import {StyleSheet, TextInput, TextStyle, ViewStyle} from 'react-native';

import {useAppTheme} from '../../theme/useTheme';
import {Text, SubTitle} from '../Typography';

interface IRenderInputProps extends IInputProps {
  label?: string;
  error?: string;
  labelStyles?: TextStyle;
  showCount?: boolean;
  containerStyles?: ViewStyle;
  editable?: boolean;
}

const TextFieldView = React.forwardRef<TextInput, IRenderInputProps>(
  (props: IRenderInputProps, ref) => {
    const {
      showCount,
      error,
      label,
      labelStyles,
      containerStyles,
      style,
      ...restProps
    } = props;

    const theme = useAppTheme();

    return (
      <Box alignItems="center" mt={1} style={containerStyles}>
        <FormControl isInvalid={Boolean(error)}>
          {label ? (
            <Text
              color={theme.colors.text[700]}
              fontSize="14px"
              fontWeight="500"
              letterSpacing="0.15"
              lineHeight="16.8px"
              mb={1.5}
              style={labelStyles}>
              {label}
            </Text>
          ) : null}
          <Input
            variant={'underlined'}
            backgroundColor={'transparent'}
            color={theme.colors.frame[900]}
            cursorColor={theme.colors.text[900]}
            focusOutlineColor={theme.colors.gray[800]}
            fontSize="18px"
            letterSpacing="0.15"
            lineHeight="21.6px"
            minHeight={props.minHeight ?? props.multiline ? '65px' : '48px'}
            placeholderTextColor={theme.colors.gray[700]}
            ref={ref}
            size="md"
            style={[style]}
            {...restProps}
          />
          {showCount ? (
            <SubTitle
              color={theme.colors.gray[500]}
              fontSize="xs"
              position="absolute"
              right={1}
              top={label ? '12px' : '-12px'}>
              {props.value?.length}/{props.maxLength}
            </SubTitle>
          ) : null}
          {error ? (
            <View flexDirection="row" mt={2} pr={2} width="100%">
              <WarningOutlineIcon
                size="xs"
                style={[{color: theme.colors.red[600]}, styles.errorIconStyle]}
              />
              <Text color={theme.colors.red[600]} width="98%">
                {error}
              </Text>
            </View>
          ) : null}
        </FormControl>
      </Box>
    );
  },
);

TextFieldView.defaultProps = {
  label: undefined,
  error: undefined,
  labelStyles: {},
  containerStyles: {},
  showCount: false,
  editable: true,
};

const styles = StyleSheet.create({
  input: {
    // minHeight: 48,
    // borderBottomWidth: 1,
  },
  errorIconStyle: {
    marginTop: 5,
    marginRight: 5,
  },
});

const TextField = React.memo(TextFieldView);
export {TextField};

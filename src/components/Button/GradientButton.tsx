/**
 * @format
 */
import { View, IButtonProps, Button as NativeButton } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import {
  ColorType,
  ResponsiveValue,
} from "native-base/lib/typescript/components/types";
import {
  IFontSize,
  IFontWeight,
} from "native-base/lib/typescript/theme/base/typography";

import { Gradients, useAppTheme } from "theme";
import { ViewStyleProps } from "constants";

import { SafeTouchable } from "../SafeTouchable";
import { Text } from "../Typography";

interface GradientButtonProps extends IButtonProps {
  title: string;
  colors?: string[];
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  style?: ViewStyleProps;
  fontWeight?: ResponsiveValue<IFontWeight | number | (string & unknown)>;
  fontSize?: ResponsiveValue<IFontSize | number | (string & unknown)>;
  textColor?: ColorType;
  containerStyle?: ViewStyleProps;
}

function GradientButton(props: GradientButtonProps) {
  const {
    colors,
    loading,
    disabled,
    loadingText,
    title,
    style,
    onPress,
    fontWeight,
    fontSize,
    textColor,
    containerStyle,
    ...rest
  } = props;

  const theme = useAppTheme();

  if (disabled) {
    return (
      <View borderRadius="120px" overflow="hidden" pointerEvents="none">
        <LinearGradient
          colors={["#2B2B2B", "#535353"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
        >
          <NativeButton
            _loading={{ _text: { color: theme.colors.white[900] } }}
            backgroundColor="transparent"
            isLoading={loading}
            isLoadingText={loadingText}
            pointerEvents="none"
            style={style}
            {...rest}
          >
            <Text
              color={textColor ?? theme.colors.white[900]}
              fontSize={fontSize}
              fontWeight={fontWeight}
              opacity={0.3}
            >
              {title}
            </Text>
          </NativeButton>
        </LinearGradient>
      </View>
    );
  }

  return (
    <SafeTouchable
      onPress={onPress}
      style={[{
        backgroundColor: theme.colors.primary[700],
        borderRadius: 8,
        overflow: 'hidden'
      }, containerStyle]}
    >
      {/* <LinearGradient
          colors={[ theme.colors.primary[800]]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 1 }}
        > */}
      <View borderRadius="120px" overflow="hidden">
        <NativeButton
          _loading={{ _text: { color: theme.colors.white[900] } }}
          colorScheme={disabled ? "gray" : "brand"}
          isDisabled={disabled}
          isLoading={loading}
          isLoadingText={loadingText}
          pointerEvents="none"
          style={style}
          {...rest}
        >
          <Text
            color={textColor ?? theme.colors.white[900]}
            fontSize={fontSize}
            fontWeight={fontWeight}
          >
            {title}
          </Text>
        </NativeButton>
      </View>
      {/* </LinearGradient> */}
    </SafeTouchable>
  );
}

GradientButton.defaultProps = {
  disabled: false,
  loading: false,
  loadingText: "",
  style: undefined,
  onPress: undefined,
  fontWeight: "bold",
  fontSize: 15,
  textColor: "#fff",
  colors: Gradients.primary,
};

export { GradientButton };

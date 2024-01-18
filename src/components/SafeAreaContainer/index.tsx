/**
 * @format
 */
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import {
  SafeAreaViewProps,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { ViewStyleProps } from "constants";

import { useAppTheme } from "../../theme/useTheme";

interface SafeAreaProps extends SafeAreaViewProps {
  children: JSX.Element | JSX.Element[];
  style?: ViewStyleProps;
}

function SafeAreaContainer(props: SafeAreaProps) {
  const { children, style, ...rest } = props;
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      {...rest}
      style={[styles.safeAreaView, { paddingBottom: insets.bottom }, style]}
    >
      {children}
    </SafeAreaView>
  );
}

SafeAreaContainer.defaultProps = {
  style: undefined,
};

const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
  },
});

export { SafeAreaContainer };

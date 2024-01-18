/**
 * @format
 */
import React from "react";
import { View } from "native-base";

import { useAppTheme } from "theme";
import LinearGradient from "react-native-linear-gradient";

interface Props {
  steps: number;
  currentStep: number;
}

const INDICATOR_SIZE = 17;

function StepIndicator(props: Props) {
  const { steps, currentStep } = props;
  const theme = useAppTheme();

  return (
    <View
      backgroundColor={theme.colors.frame[800]}
      height="4px"
      width={steps * INDICATOR_SIZE}
    >
      <LinearGradient
        colors={[theme.colors.primary[900],theme.colors.primary[800],theme.colors.primary[700]]}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
        style={{height: 4, width: INDICATOR_SIZE, marginLeft: currentStep * INDICATOR_SIZE, position: 'absolute'}}
      >
        {/* <View
          height="4px"
          left={currentStep * INDICATOR_SIZE}
          position="absolute"
          width={INDICATOR_SIZE}
        /> */}
      </LinearGradient>
    </View>
  );
}

export { StepIndicator };

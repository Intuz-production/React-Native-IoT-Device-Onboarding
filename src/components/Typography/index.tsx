/**
 * @format
 */

import * as React from 'react';
import {IInputProps, ITextProps, Text as NText} from 'native-base';

import {isAndroid} from 'constants';
import {ResponsiveValue} from 'native-base/lib/typescript/components/types';
import {useTheme} from 'theme';
import { fontFamily } from 'theme';

function Caption(props: IInputProps) {
  const {children, ...rest} = props;

  return (
    <NText color="gray.800" fontSize="sm" {...rest}>
      {children}
    </NText>
  );
}

function Title(props: IInputProps) {
  const {children, ...rest} = props;
  const theme = useTheme();
  console.log('theme: ', theme.themes.dark.fontConfig.Poppins[100].normal);

  return (
    <NText fontSize="sm" fontWeight="bold" {...rest}   >
      {children}
    </NText>
  );
}

function SubTitle(props: IInputProps) {
  const {children, ...rest} = props;

  return (
    <NText color="black.700" fontSize="sm" {...rest}>
      {children}
    </NText>
  );
}

type FontWeightType = ResponsiveValue<
  | (string & {})
  | (number & {})
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'
  | 'extraBlack'
>;

const getFontWeight = (fontWeight: FontWeightType) => {
  let uFontWeight = fontWeight;
  switch (fontWeight) {
    case '100':
    case '200':
      uFontWeight = 'thin';
      break;
    case '300':
    case '400':
      uFontWeight = 'light';
      break;
    case '500':
      uFontWeight = 'semibold';
      break;
    case '600':
      uFontWeight = 'bold';
      break;
    case '700':
    case '800':
    case '900':
      uFontWeight = 'extrabold';
      break;
    default:
      break;
  }
  return uFontWeight;
};

const getFontFamily = (fontWeight: FontWeightType) => {
  let uFontWeight = fontFamily.regular;
  switch (fontWeight) {
    case '100':
      uFontWeight = fontFamily.thin;
      break;
    case '200':
      uFontWeight = fontFamily.extraLight;
      break;
    case '300':
      uFontWeight = fontFamily.light;
      break;
    case '400':
      uFontWeight = fontFamily.regular;
      break;
    case '500':
    case 'semibold':
      uFontWeight = fontFamily.semiBold;
      break;
    case '600':
    case 'bold':
      uFontWeight = fontFamily.bold;
      break;
    case '700':
    case 'extrabold':
      uFontWeight = fontFamily.extraBold;
      break;
    case '800':
    case '900':
    case 'black':
      uFontWeight = fontFamily.black;
      break;
    default:
      break;
  }
  return uFontWeight;
};

function Text(props: ITextProps) {
  const {children, fontWeight, ...rest} = props;
  if (isAndroid) {
    const pProps: ITextProps = {...rest};
    if (isAndroid) {
      if (fontWeight) {
        const fWeight = getFontWeight(fontWeight);
        const fFamily = getFontFamily(fWeight);
        pProps.fontWeight = fWeight;
        pProps.fontFamily = fFamily;
      }
    }

    return <NText {...pProps}>{children}</NText>;
  }
  return (
    <NText fontWeight={fontWeight} {...rest}>
      {children}
    </NText>
  );
}

export {Caption, Title, SubTitle, Text};

export * from './GradientText';

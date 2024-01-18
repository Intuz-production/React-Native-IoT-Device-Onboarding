/**
 * @format
 */
 import React, {memo, forwardRef} from 'react';
 import ReactNativePickerModule from 'react-native-picker-module';
 import {useAppTheme} from 'theme';

 interface PropsType {
    theme: any;
    items: any;
    title: string;
    value: any;
    onChange: () => void;
 }

 
 const AppPickerView = memo(
   forwardRef((props: PropsType, ref: any) => {
     const {items, title, value, onChange} = props;
     const theme = useAppTheme();
     return (
       <ReactNativePickerModule
         pickerRef={ref}
         value={value}
         title={title}
         items={items}
        //  titleStyle={{
        //    color: theme.colors.black,
        //    fontFamily: theme.fontFamily.regular,
        //    fontSize: theme.fontSizes[3],
        //  }}
        //  itemStyle={{
        //    color: theme.colors.black,
        //    fontFamily: theme.fontFamily.regular,
        //    fontSize: theme.fontSizes[3],
        //  }}
        //  selectedColor={theme.colors.black}
        //  confirmButtonEnabledTextStyle={{
        //    color: theme.colors.black,
        //    fontFamily: theme.fontFamily.regular,
        //    fontSize: theme.fontSizes[3],
        //  }}
        //  confirmButtonDisabledTextStyle={{
        //    color: theme.colors.black + 20,
        //    fontFamily: theme.fontFamily.regular,
        //    fontSize: theme.fontSizes[3],
        //  }}
        //  cancelButtonTextStyle={{
        //    color: theme.colors.black,
        //    fontSize: theme.fontSizes[3],
        //  }}
        //  confirmButtonStyle={{backgroundColor: theme.colors.white}}
        //  cancelButtonStyle={{backgroundColor: theme.colors.white}}
        //  contentContainerStyle={{backgroundColor: theme.colors.white}}
         onValueChange={onChange}
       />
     );
   }),
 );
 
 const AppPicker = AppPickerView
 export {AppPicker};
 
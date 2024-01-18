/**
 * @format
 */

import React, {forwardRef, useImperativeHandle} from 'react';
// eslint-disable-next-line react-native/split-platform-components
import {PermissionsAndroid, View} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import {isAndroid} from 'constants';

const photoOptions: ImageLibraryOptions = {
  mediaType: 'photo',
  maxWidth: 1600,
  maxHeight: 1600,
  includeBase64: false,
};

export interface IMedia {
  uri: string;
  name: string;
  type: string;
}

export type ImageUpdateType = 'cover' | 'avatar';

const ImageSource = {gallery: 0, camera: 1, none: 2};
export interface ISelectedMedia extends IMedia {
  base64: string;
}

type ImageSource = 'gallery' | 'camera';
export type IAssetType = Asset;
interface IPickerProps {
  onSelectImage: (image: IAssetType) => void;
  options?: ImageLibraryOptions;
}

export type IPressHandler = {
  onPickerSelect: (type?: ImageSource) => void;
};

const optionArray = ['Photo Library', 'Use Camera', 'Cancel'];

const MediaPicker = forwardRef<IPressHandler, IPickerProps>(
  (props: IPickerProps, ref) => {
    useImperativeHandle(ref, () => ({onPickerSelect: onOpen}));
    const actionRef = React.useRef<ActionSheet>(null);

    const onOpen = () => {
      // setActionSheet(true);
      actionRef?.current?.show();
    };

    const {onSelectImage, options} = props;

    const onUseCameraPress = () =>
      isAndroid ? requestCameraPermission() : showCamera();

    const requestCameraPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        showCamera();
      }
    };

    const handleResponse = async (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorCode) {
        return;
      }
      const image = response.assets?.[0];
      if (image && image?.uri && onSelectImage) {
        onSelectImage(image);
      }
    };

    const showGallery = async () => {
      if (options) {
        launchImageLibrary(options, handleResponse);
      }
    };

    const showCamera = () => {
      if (options) {
        launchCamera(options, handleResponse);
      }
    };

    const onPress = (index: number) => {
      switch (index) {
        case 0:
          showGallery();
          break;
        case 1:
          onUseCameraPress();
          break;
        default:
          break;
      }
    };

    return (
      <View>
        <ActionSheet
          cancelButtonIndex={optionArray.length - 1}
          options={optionArray}
          ref={actionRef}
          title="Please select source:"
          onPress={onPress}
        />
      </View>
    );
  },
);

MediaPicker.defaultProps = {
  options: photoOptions,
};

export type PickerHandle = React.ElementRef<typeof MediaPicker>;
export {MediaPicker};

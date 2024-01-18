/**
 * @format
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'native-base';
import PagerView from 'react-native-pager-view';
import Animated, { useHandler, useEvent, runOnJS } from 'react-native-reanimated';

import { isAndroid, STATUSBAR_HEIGHT, storage, StorageKeys } from 'constants';
import {
  SafeAreaContainer,
  GradientButton,
  SafeTouchable,
  StepIndicator,
  HeaderLeft,
  Text,
} from 'components';
import { RootStackScreenProps, LegalType } from 'interface';
import { darkTheme, useAppTheme } from 'theme';

import { TutorialPage } from './TutorialPage';
import { useTutorialInfo } from './useTutorialInfo';
import { useEndPoint } from 'screens/ConfigScreen/useEndPoint';
import { StatusBar } from 'react-native';

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

export function usePagerScrollHandler(handlers: any, dependencies?: any) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];



  return useEvent<any>(
    event => {
      'worklet';

      const { onPageScroll } = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer,
  );
}

function Tutorial(props: RootStackScreenProps<'Tutorial'>) {
  const { navigation, route } = props;

  const theme = useAppTheme();
  const pagerRef = React.useRef<PagerView>(null);

  const [pageNo, setPageNo] = React.useState(0);

  const { t } = useTranslation();

  const {data: endPointInfo, refetch: refetchEndpoint} = useEndPoint();

  const { tutorialInfo } = useTutorialInfo();

  React.useEffect(() => {
    storage.set(StorageKeys.SHOWN_TUTORIAL, true);
  }, []);

  React.useLayoutEffect(() => {
    const headerLeft = () => <HeaderLeft onPress={navigation.goBack} />;

    navigation.setOptions({
      headerShown: route.params?.goBack ?? false,
      headerBackVisible: false,
      headerTitleAlign: 'center',
      headerLeft,
    });
  }, [navigation, route.params?.goBack]);

  const handler = usePagerScrollHandler({
    onPageScroll: (e: any) => {
      'worklet';

      if (e.offset === 0 && pageNo !== e.position) {
        runOnJS(setPageNo)(e.position);
      }
    },
  });

  const onContinuePress = () => {
    if (pageNo < 3) {
      pagerRef.current?.setPage(pageNo + 1);
    } else if (route.params?.goBack) {
      navigation.goBack();
    } else {
      navigation.replace('ConfigScreen');
    }
  };

  const onBackPress = () => {
    if (pageNo > 0) {
      pagerRef.current?.setPage(pageNo - 1);
    }
  };

  const continueTitle = t(
    `tutorial.${route.params?.goBack ? 'next' : 'continue'}`,
  );

  const prevTitle = t(
    `tutorial.back`,
  );

  return (
    <View style={{flex:1, }}>
      <StatusBar
              backgroundColor={darkTheme ? "#fff" : "#000"}
              barStyle={darkTheme ? "dark-content" : "light-content"}
            />
      <AnimatedPager
        initialPage={0}
        ref={pagerRef}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ flex: 1 }}
        onPageScroll={handler}>
        {tutorialInfo.map((info, index) => {
          const { bg, image, title, subTitle } = info;
          const key = `${index + 1}`;
          return (
            <View key={`container-${key}`}>
              <View
                bottom={0}
                key={`bg-image-${key}`}
                left={0}
                position="absolute"
                right={0}
                top={0}>
                <Image
                  alt="bg-image"
                  height="100%"
                  resizeMode="cover"
                  source={Number(bg)}
                  width="100%"
                />
              </View>
              <TutorialPage
                image={Number(image)}
                key={`tutorial-${key}`}
                subTitle={subTitle}
                theme={theme}
                title={title}
              />
            </View>
          );
        })}
      </AnimatedPager>
      <View
        bottom={isAndroid ? '14px' : '70px'}
        left={0}
        position="absolute"
        right={0}>
        <View
          alignItems="center"
          left={0}
          position="absolute"
          right={0}
          top={-40}>
          <StepIndicator currentStep={pageNo} steps={tutorialInfo.length} />
        </View>
        <View alignSelf="center" width="100%" flexDirection={"row"} justifyContent={pageNo !== 0 ? "space-around" : "center"}>
          {pageNo !== 0 ?
            <GradientButton
              fontSize="lg"
              height="50px"
              loadingText="Loading"
              title={prevTitle}
              onPress={onBackPress}
              style={{ width: 130}}
            /> : <></>}
          <GradientButton
            fontSize="lg"
            height="50px"
            loadingText="Loading"
            title={continueTitle}
            onPress={onContinuePress}
            style={{ width: 130}}
          />

        </View>
        {/* <View alignSelf="center" height="40px" pt={2}>
          {pageNo === 0 && !route.params?.goBack ? (
            <>
              <Text color={theme.colors.gray[800]}>
                {t('tutorial.proceed')}
              </Text>
              <View flexDirection="row">
                <SafeTouchable onPress={onTermsPress}>
                  <Text color={theme.colors.text[900]}>{t('app.terms')}</Text>
                </SafeTouchable>
                <Text color={theme.colors.gray[800]}>{t('app.and')}</Text>
                <SafeTouchable onPress={onPolicyPress}>
                  <Text color={theme.colors.text[900]}>{t('app.privacy')}</Text>
                </SafeTouchable>
              </View>
            </>
          ) : null}
        </View> */}
      </View>
    </View>
  );
}

export default Tutorial;

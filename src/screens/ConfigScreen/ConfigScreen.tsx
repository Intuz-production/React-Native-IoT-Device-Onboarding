/**
 * @format
 */
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaContainer,
  GradientButton,
  Title,
  Text,
  SafeTouchable,
  TextField,
} from "components";
import { LegalType, RootStackScreenProps } from "interface";
import { KeyboardAvoidingView, Pressable, Spacer } from "native-base";
import { Images } from "assets/images";
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  Dimensions,
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";
import { useAppTheme } from "theme";
import { ScrollView } from "react-native-gesture-handler";
import { darkTheme } from "theme";
import { clockRunning } from "react-native-reanimated";
import { AppPicker } from "components/AppPicker";
import DropDownPicker from "react-native-dropdown-picker";
import { useOnboarding } from "./useOnboarding";

const ProvState = {
  DeviceWaitingForScanning0: 0,
  DeviceWaitingForScanning3: 3,
  DeviceScanningUnderProcess: 5,
  DeviceScanningDone: 6,
  WaitingForNetworkCredentials: 7,
  ConnectingRouter: 8,
  ConnectedToRouter: 9,
  FailedToConnectRouter: 10,
  ConnectingToCloud: 11,
  ConnectedToCloud: 12,
  FailedToConnectCloud: 13,
};

import { useSendCredentials } from "./useSendCredentials";
import { useSendEndpoint } from "./useSendEndpoint";
import ProgressDialog from "components/ProgressDialog";
import Toast from "react-native-toast-message";

interface ToastProps {
  type: string;
  title: string;
  description: string;
}

function ConfigScreen(props: RootStackScreenProps<"ConfigScreen">) {
  const { navigation, route } = props;

  const dropDownRef = React.useRef();
  // const endPointInfo = { hub_endpoint: "sp-de-ih-stg.azure-devices.net" };

  const theme = useAppTheme();
  const { t } = useTranslation();
  const [networkName, setNetworkName] = useState("");
  const [networkPassword, setNetworkPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  // const [errorMessage, setErrorMessage] = useState<string>("");

  const [open, setOpen] = useState(false);

  const [spinner, setSpinner] = useState(false);
  // const [epSent, setEPSent] = useState(false);

  const onSubmitCredentials = (values) => {
    const { ssid, pass } = values;
    trySendCredentials({ ssid, pass, callback: getDelayedProvState });
  };

  const { trySendCredentials, isLoading: loadingSendCredentials } =
    useSendCredentials();

  // const {
  //   isLoading: loadingEP,
  //   isError: isErrorEP,
  //   error: errorEP,
  //   trySendEndpoint,
  // } = useSendEndpoint();

  const {
    tryGetInfo,
    tryGetProvState,
    tryNetworkScanning,
    tryGetAPList,
    tryReboot,
  } = useOnboarding();

  const {
    data: provData,
    isFetching: loadingProvState,
    refetch: getProvState,
  } = tryGetProvState;
  console.log("provData: ", provData);

  const getDelayedProvState = useCallback(() => {
    setSpinner(true);
    const tm = setTimeout(() => {
      getProvState();
      setSpinner(false);
      clearTimeout(tm);
    }, 5000);
  }, [getProvState]);

  // const onSuccessEndPoint = useCallback(() => {
  //   console.log("onSuccessEndPoint");
  //   getDelayedProvState();
  // }, [getDelayedProvState]);

  // const shareEP = useCallback(() => {
  //   setEPSent(true);
  //   trySendEndpoint({
  //     ep: endPointInfo.hub_endpoint,
  //     callback: onSuccessEndPoint,
  //   });
  // }, [endPointInfo.hub_endpoint, onSuccessEndPoint, trySendEndpoint]);

  const {
    data: deviceInfo,
    isFetching: loadingInfo,
    refetch: refetchInfo,
    isError: isErrorInfo,
    error: errorInfo,
  } = tryGetInfo;

  //On DeviceInfo Success Send Endpoint
  // useEffect(() => {
  //   if (deviceInfo && !epSent) {
  //     console.log("calling share ep");
  //     shareEP();
  //   }
  // }, [deviceInfo, epSent, shareEP]);

  const {
    data: networkScanData,
    isFetching: loadingNetworkScan,
    isError: isErrorScanning,
    error: errorScanning,
    refetch: refetchScanning,
  } = tryNetworkScanning;

  useEffect(() => {
    refetchScanning();
  }, [deviceInfo])

  const {
    data: apListData = [],
    isFetching: loadingAPList,
    isRefetching: reloadingAPList,
    refetch: getAPList,
  } = tryGetAPList;

  console.log("apListData: ", apListData);
  const {
    data: rebootData,
    isFetching: loadingReboot,
    refetch: startReboot,
  } = tryReboot;

  const gotoConnectionStatus = useCallback(
    (status = false) => {
      console.log(
        "=================== Connect status =====================>",
        status
      );
      if (status) {
        navigation.replace("SuccessScreen", {status});
        showToast({
          type: "success",
          title: "Device Connected",
          description: "Successfully connected device to the internet",
        });
      } else {
        showToast({
          type: "error",
          title: "Try again",
          description: "Device is not connected to the internet!",
        });
        navigation.replace("SuccessScreen", {status});
      }
    },
    [deviceInfo, navigation, route.params]
  );

  const showToast = ({ type, title, description }: ToastProps) => {
    Toast.show({
      type: type ?? "info",
      text1: title ?? "Alert",
      text2: description ?? "Information",
    });
  };

  useEffect(() => {
    if (rebootData && rebootData.Ok === 1) {
      gotoConnectionStatus(true);
    }
  }, [gotoConnectionStatus, rebootData]);

  useEffect(() => {
    if (networkScanData) {
      getDelayedProvState();
    }
  }, [networkScanData, getDelayedProvState]);

  const onSuccessCredentials = useCallback(() => {
    startReboot();
  }, [startReboot]);

  const isError = isErrorInfo || isErrorScanning;
  const error = errorInfo || errorScanning;

  useEffect(() => {
    if (provData) {
      const { state } = provData;
      setSpinner(false);
      console.log("Device state-->", state);
      switch (state) {
        case ProvState.DeviceWaitingForScanning0: //0
        case ProvState.DeviceWaitingForScanning3: //3
          refetchScanning();
          break;
        case ProvState.DeviceScanningUnderProcess: //5
        case ProvState.DeviceScanningDone: //6
        case ProvState.ConnectingRouter: //8
          getDelayedProvState();
          break;
        case ProvState.WaitingForNetworkCredentials: //7
          getAPList();
          break;
        case ProvState.ConnectedToRouter: //9
          onSuccessCredentials();
          // gotoConnectionStatus(true);
          break;
        case ProvState.FailedToConnectRouter: //10
          gotoConnectionStatus(false);
          break;
        default:
          break;
      }
    }
  }, [
    isError,
    provData,
    getProvState,
    refetchScanning,
    getAPList,
    getDelayedProvState,
    onSuccessCredentials,
    gotoConnectionStatus,
  ]);

  // if (isError && error !== null) {
  //   const errorMsg = isErrorInfo
  //     ? t("onboard.macerror")
  //     : isErrorEP
  //     ? shareEP
  //     : isErrorScanning
  //     ? isErrorScanning.message
  //     : "";

  //   const refetch = isErrorInfo
  //     ? refetchInfo
  //     : isErrorScanning
  //     ? refetchScanning
  //     : null;
  // }

  const refreshList = async () => {
    console.log("Refresh Pressed");
    await refetchScanning();
    setNetworkName("")
    getAPList();
  };

  // useEffect(()=>{
  //   if (networkName.length) {
  //     setErrorMessage("")
  //   }else{
  //     setErrorMessage("Please select a network")
  //   }
  // }, [networkName])

  const handleSubmit = () => {
    if (networkName.trim().length) {
      onSubmitCredentials({ ssid: networkName, pass: networkPassword.trim() });
    } else {
      if (!networkName.trim().length) {
        showToast({type: 'error', title: 'Network name requires', description: 'Please select a network name'})
      }
    }
  };
  // const setCredentials = (value: string, type: string) => {
  //   if (type == "name") {
  //     setNetworkName(value);
  //     if (value.trim().length) {
  //       setErrorMessage("");
  //     } else {
  //       setErrorMessage("Please select a network");
  //     }
  //   }
  // };

  const handleToggle = () => {
    setSecureEntry(!secureEntry);
  };

  const getMessage = useCallback(() => {
    const loading =
      spinner ||
      loadingInfo ||
      loadingNetworkScan ||
      loadingAPList ||
      reloadingAPList ||
      loadingProvState ||
      loadingReboot;

    const lookingForWifi =
      loadingNetworkScan || loadingAPList || reloadingAPList;
    return lookingForWifi
      ? "Scanning for Wi-Fi..."
      : loadingSendCredentials
      ? "Connecting to Wi-Fi"
      : "Please wait...";
  }, [
    spinner,
    loadingInfo,
    loadingProvState,
    loadingNetworkScan,
    loadingAPList,
    reloadingAPList,
  ]);

  // const passwordIcon = useCallback(() => {
  //   console.log(secureEntry);
  //   // if (secureEntry) {
  //   //   console.log(secureEntry);
  //   //   return <TouchableOpacity
  //   //     style={{ position: "absolute", right: 0 }}
  //   //     onPress={handleToggle}
  //   //   >
  //   //     <Image
  //   //       alt="password_toggle"
  //   //       source={Images.passwordHide}
  //   //       style={[{ height: 20, width: 20 }]}
  //   //     />
  //   //   </TouchableOpacity>;
  //   // }
  //   return (
  //     <Pressable
  //       style={{ position: "absolute", right: 0, top: 10 }}
  //       onPress={handleToggle}
  //     >
  //       {secureEntry ? <Image
  //         alt="password_toggle"
  //         source={Images.passwordHide}
  //         style={[{ height: 20, width: 20 }]}
  //       />
  //       :
  //       <Image
  //         alt="password_toggle"
  //         source={Images.passwordShow}
  //         style={[{ height: 20, width: 20 }]}
  //       />}
  //     </Pressable>
  //   );
  // }, [secureEntry]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps={"handled"}
    >
      <StatusBar
        backgroundColor={darkTheme ? "#fff" : "#000"}
        barStyle={darkTheme ? "dark-content" : "light-content"}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          setOpen(false);
        }}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          h={{
            base: Dimensions.get("window").height,
          }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <SafeAreaContainer edges={["top", "bottom"]}>
            <StatusBar
              backgroundColor={darkTheme ? "#fff" : "#000"}
              barStyle={darkTheme ? "dark-content" : "light-content"}
            />
            <View
              style={{
                flex: 1,
                alignContent: "center",
                justifyContent: "flex-start",
                marginTop: 50,
              }}
            >
              <Image
                resizeMode="contain"
                source={Images.project_logo}
                style={styles.project_logo}
              />
            </View>
            {provData?.state == 7 ? (
              <View style={{ flex: 4 }}>
                <View
                  style={{
                    flex: 1,
                    alignContent: "center",
                    marginTop: 30,
                  }}
                >
                  <Text
                    color={theme.colors.message[600]}
                    style={{ fontSize: 16, textAlign: "center" }}
                  >
                    {"Successfully connected to the INTUZ Controller"}
                  </Text>
                  <Text
                    color={theme.colors.black[800]}
                    style={{ fontSize: 16, textAlign: "center" }}
                    marginTop={10}
                  >
                    {
                      "This Next Step will connect \n INTUZ device to your wireless network."
                    }
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    alignContent: "center",
                    padding: 20,
                  }}
                >
                  <View style={{ marginBottom: 20 }}>
                    <DropDownPicker
                      containerStyle={{
                        borderWidth: 0,
                      }}
                      style={{
                        borderWidth: 0,
                        backgroundColor: "transparent",
                        zIndex: 10000,
                        borderBottomWidth: 1,
                        borderBottomColor: theme.colors.gray[900],
                        marginBottom: 5,
                        borderRadius: 0,
                      }}
                      placeholderStyle={{ color: "#828282", fontSize: 16 }}
                      open={open}
                      value={networkName}
                      items={apListData}
                      setOpen={setOpen}
                      setValue={setNetworkName}
                      placeholder={"Network name"}
                      showArrowIcon={false}
                      itemKey={Math.random().toString()}
                      listMode={"SCROLLVIEW"}
                      closeOnBackPressed={true}
                      dropDownContainerStyle={{
                        borderWidth: 0,
                        borderRadius: 0,
                        backgroundColor: "rgba(255,255,255,1)",
                      }}
                      schema={{
                        label: "ssid",
                        value: "ssid",
                      }}
                    />
                    <Pressable
                      hitSlop={{ top: 10, bottom: 10 }}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "20%",
                        zIndex: 10000,
                      }}
                      flexDirection={"row"}
                      alignItems={"center"}
                      onPress={refreshList}
                    >
                      <Text
                        color={theme.colors.gray[650]}
                        style={{
                          fontSize: 16,
                          textAlign: "center",
                          marginRight: 5,
                        }}
                      >
                        {"(SSID)"}
                      </Text>
                      <Image source={Images.refreshIcon} />
                    </Pressable>
                    {/* {errorMessage && (
                      <Text
                        style={{
                          paddingLeft: 10,
                          color: theme.colors.message[800],
                        }}
                      >
                        {errorMessage}
                      </Text>
                    )} */}
                  </View>

                  <TextField
                    value={networkPassword}
                    onChangeText={setNetworkPassword}
                    placeholder="Network password"
                    placeholderTextColor={"#828282"}
                    containerStyles={{ marginBottom: 20 }}
                    style={{ fontSize: 16, paddingLeft: 10 }}
                    secureTextEntry={secureEntry}
                    InputRightElement={
                      <Pressable
                        style={{ position: "absolute", right: 0, top: 10 }}
                        onPress={handleToggle}
                      >
                        {secureEntry ? (
                          <Image
                            source={Images.passwordHide}
                            style={[{ height: 20, width: 20 }]}
                          />
                        ) : (
                          <Image
                            source={Images.passwordShow}
                            style={[{ height: 20, width: 20 }]}
                          />
                        )}
                      </Pressable>
                    }
                  />

                  <GradientButton
                    onPress={handleSubmit}
                    fontSize="lg"
                    height="50px"
                    loadingText="Loading"
                    title={"Submit"}
                    containerStyle={{ marginVertical: 20 }}
                  />
                </View>
              </View>
            ) : provData?.state == 10 ? (
              <View style={{ flex: 4, padding: 20 }}>
                <View
                  style={{
                    flex: 1,
                    alignContent: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text
                    color={theme.colors.message[800]}
                    style={{ fontSize: 16, textAlign: "center" }}
                  >
                    {
                      "Connection not established between mobile device and controller"
                    }
                  </Text>
                  <Text
                    color={theme.colors.black[800]}
                    style={{ fontSize: 16, textAlign: "center" }}
                    marginTop={10}
                  >
                    {
                      "Try again from the Guide screen and Make sure you are connected to the Wi-Fi of the Controller device."
                    }
                  </Text>
                  <Image
                    source={Images.connectionError}
                    style={styles.connectionErrorStyle}
                  />
                </View>
                <View>
                  <GradientButton
                    onPress={() => {
                      navigation.replace("Tutorial");
                    }}
                    fontSize="lg"
                    height="50px"
                    loadingText="Loading"
                    title={"Try again"}
                    containerStyle={{ marginVertical: 20 }}
                  />
                </View>
              </View>
            ) : (
              <></>
            )}
          </SafeAreaContainer>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <ProgressDialog
        label={getMessage()}
        loaderColor={"gray"}
        visible={
          spinner ||
          loadingInfo ||
          loadingProvState ||
          loadingNetworkScan ||
          loadingAPList ||
          reloadingAPList ||
          loadingReboot ||
          loadingSendCredentials
        }
      />
    </ScrollView>
  );
}

export default ConfigScreen;

const styles = StyleSheet.create({
  project_logo: {
    marginBottom: 50,
    width: 250,
    height: 200,
    alignSelf: "center",
  },
  connectionErrorStyle: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  login_text: {
    width: 320,
    height: 39,
    // marginLeft: 24,
    // position: 'absolute',
    fontSize: 26,
    paddingTop: 10,
  },
  textField: {
    width: 327,
    height: 58,
    // marginLeft: 24,
    // marginTop: 39,
    borderWidth: undefined,
  },
});

{
  /* <TextField
              value={networkName}
              onPressIn={showNetworkPicker}
              pointerEvents="none"
              onChangeText={(name) => setCredentials(name, "name")}
              placeholder="Network name"
              placeholderTextColor={"#828282"}
              containerStyles={{ marginBottom: 20 }}
              style={{ fontSize: 16 }}
              error={errorMessage.networkNameError}
              InputRightElement={
                <Pressable
                  flexDirection={"row"}
                  alignItems={"center"}
                  onPress={refreshList}
                >
                  <Text
                    color={theme.colors.gray[650]}
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      marginRight: 5,
                    }}
                  >
                    {"(SSID)"}
                  </Text>
                  <Image
                    alt="refresh_icon"
                    source={Images.refreshIcon}
                    // style={styles.refreshIcon}
                  />
                </Pressable>
              }
            /> */
}

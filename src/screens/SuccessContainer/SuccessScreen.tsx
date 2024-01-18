/**
 * @format
 */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LegalType, RootStackScreenProps } from "interface";
import {
  KeyboardAvoidingView,
  Pressable,
  Spacer,
  Text,
} from "native-base";
import { Images } from "assets/images";
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  Dimensions,
  StatusBar,
  Platform,
  Image
} from "react-native";
import { darkTheme, useAppTheme } from "theme";
import { ScrollView } from "react-native-gesture-handler";
import { GradientButton, SafeAreaContainer } from "components";

function SuccessScreen(props: RootStackScreenProps<"SuccessScreen">) {
  const { navigation, route } = props;

  const { status = false } = route?.params;
  console.log('status: ', status);

  const theme = useAppTheme();
  const { t } = useTranslation();
  const [networkName, setNetworkName] = useState("");
  const [networkPassword, setNetworkPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    networkNameError: "",
    networkPasswordError: "",
  });

  const handleSubmit = () => {
    navigation.replace("Tutorial");
  };
  return (
    <SafeAreaContainer edges={["top", "bottom"]} style={{ flex: 1 }}>
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
          alt="project_logo"
          source={Images.project_logo}
          style={styles.project_logo}
          resizeMode={"contain"}
        />
      </View>
      <View
        style={{
          flex: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {status ? (
          <Image
            alt="project_logo"
            source={Images.routerIcon}
            style={[styles.deviceSuccessConnectIcon,{tintColor: 'lightgreen'}]}
          />
        ) : (
          <Image
            alt="project_logo"
            source={Images.connectionFailed}
            style={styles.deviceSuccessConnectIcon}
          />
        )}
        <Text
          color={status ? theme.colors.message[600] : theme.colors.message[800]}
          style={{ fontSize: 16, textAlign: "center" }}
        >
          {status
            ? "Success!\n INTUZ device is now connected to the internet!"
            : "Failed!\n Something went wrong, Controller not connected to the internet please try again."}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <GradientButton
          onPress={handleSubmit}
          fontSize="lg"
          height="50px"
          loadingText="Loading"
          title={status ? "Home" : "Try again"}
          containerStyle={{ marginVertical: 20, paddingHorizontal: 10 }}
        />
      </View>
    </SafeAreaContainer>
  );
}

export default SuccessScreen;

const styles = StyleSheet.create({
  project_logo: {
    marginBottom: 50,
    width: 250,
    height: 200,
    alignSelf: "center",
  },
  deviceSuccessConnectIcon: {
    width: 100,
    height: 100,
    marginBottom: 50,
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

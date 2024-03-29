import React, { Component } from "react";
import { View, Modal, StyleSheet, Text, ActivityIndicator, StatusBar } from "react-native";
import { isIPad } from "../../global";

class ProgressDialog extends Component {
  render() {
    const { visible, loaderColor = "#0070F9" } = this.props;
    const label = this.props.label ? this.props.label : "Please wait...";
    const labelStyle = this.props.labelStyle ? this.props.labelStyle : {};

    return (
      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={visible}
          onRequestClose={() => {}}
        >
          <View style={styles.wrapper}>
            <View style={styles.content}>
              <ActivityIndicator size="large" color={loaderColor} />
              {/* <Progress.CircleSnail color={['#0070F9', '#4ECDC4']} /> */}
              <Text style={[styles.label, labelStyle]}>{label}</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: "#00000089",
    fontSize: 18,
    alignContent: "center",
    alignSelf: "center",
    marginHorizontal: 15,
    fontWeight: "400",
    // fontFamily: 'Lato-Regular',
  },
  content: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 80,
    borderRadius: 5,
    justifyContent: "center",
    width: "80%",
    padding: 20,
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});

export default ProgressDialog;

import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Overlay, Text } from "@rneui/base";
import { styles } from "./LoadingModal.styles";

export function LoadingModal(props) {
  const { show, text } = props;

  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#FA4A0C" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

LoadingModal.defaultProps = {
  show: false,
};

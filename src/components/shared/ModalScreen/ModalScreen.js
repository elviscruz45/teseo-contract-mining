import React, { useState } from "react";
import { Modal, TouchableOpacity, Text } from "react-native";
import { styles } from "./ModalScreen.styles";
import { SafeAreaView } from "react-native-safe-area-context";
export function ModalScreen(props) {
  const { show } = props;
  const [item, setItem] = useState(null);

  setLocation = (location) => {
    setItem({ ...this.state, showModal: false });
    // this.props.photo_location(location);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={show}
      testID="ModalScreen:Modal"
    >
      <SafeAreaView
        style={[styles.container, styles.center]}
        testID="ModalScreen:SafeAreaView"
      >
        <TouchableOpacity
          testID="ModalScreen:TouchableOpacity"
          style={styles.border}
          onPress={() => setLocation("Aguas Residuales")}
        >
          <Text testID="ModalScreen:Text">Aguas Residuales</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}

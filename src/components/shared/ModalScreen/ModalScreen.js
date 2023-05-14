import React, { useState } from "react";
import { Overlay } from "@rneui/themed";
import { Modal } from "react-native";
import { styles } from "./ModalScreen.styles";

export function ModalScreen(props) {
  const { show, close, children } = props;
  const [item, setItem] = useState(null);

  setLocation = (location) => {
    setItem({ ...this.state, showModal: false });
    // this.props.photo_location(location);
  };

  return (
    <Modal animationType="slide" transparent={false} visible={show}>
      <SafeAreaView style={[styles.container, styles.center]}>
        <TouchableOpacity
          style={styles.border}
          onPress={() => setLocation("Aguas Residuales")}
        >
          <Text>Aguas Residuales</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}

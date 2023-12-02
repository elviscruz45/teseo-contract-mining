import React from "react";
import { Overlay } from "@rneui/themed";
import { styles } from "./Modal.styles";

export function Modal(props) {
  const { show, close, children } = props;
  console.log("Modallll");

  return (
    <Overlay
      isVisible={show}
      overlayStyle={styles.overlay}
      onBackdropPress={close}
      testID="overlay"
      title="Open Overlay"
    >
      {children}
    </Overlay>
  );
}

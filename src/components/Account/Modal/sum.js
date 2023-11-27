import React from "react";
import { Overlay } from "@rneui/themed";
import { styles } from "./Modal.styles";

export function MyComponent(props) {
  const { show, close, children } = props;

  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={{ width: "80%", padding: 20 }}
      testID="my-overlay" // Setting testID for getByTestId
    >
      <View>
        <Text>This is my overlay content</Text>
      </View>
    </Overlay>
  );
}

import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayMonto.styles";

export function ChangeDisplayMonto(props) {
  const { onClose, setMonto, formik } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <Input
          placeholder="Monto de cotizacion"
          testID="ChangeDisplayMonto:Input"
          value={text}
          // editable={true}
          keyboardType="numeric"
          onChangeText={(text) => setText(text)}
          // errorMessage={formik.errors.NumeroAIT}
        />
        <Button
          title="Aceptar"
          testID="ChangeDisplayMonto:Button"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            setMonto(text.toString());
            onClose();
            formik.setFieldValue("Monto", text.toString());
          }}
          // loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
}

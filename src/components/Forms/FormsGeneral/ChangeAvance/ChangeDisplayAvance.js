import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayAvance.styles";
import Toast from "react-native-toast-message";

export function ChangeDisplayAvance(props) {
  const { onClose, formik, setAvance } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <Input
          value={text}
          placeholder="Avance de Ejecucion"
          keyboardType="numeric"
          onChangeText={(text) => setText(text)}
          errorMessage={formik.errors.NumeroAIT}
        />
        <Button
          title="Aceptar"
          testID="changeDisplayAvance"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            if (isNaN(text)) {
              Toast.show({
                type: "error",
                position: "bottom",
                text1: "Ingrese un número válido",
              });
              onClose();
            } else if (text > 100 || text.trim() === "" || text < 0) {
              Toast.show({
                type: "error",
                position: "bottom",
                text1: "Solo numeros entre 0 y 100",
              });

              onClose();
            } else {
              setAvance(text.toString());
              onClose();
              formik.setFieldValue("porcentajeAvance", text.toString());
            }
          }}
        />
      </View>
    </View>
  );
}

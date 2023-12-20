import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayAvance.styles";
import { Toast } from "react-native-toast-message";

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
            if (text > 100) {
              // alert("No numeros mayores que 100");
              //correct the previous line
              Toast.show({
                type: "error",
                position: "bottom",
                text1: "No numeros mayores que 100",
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

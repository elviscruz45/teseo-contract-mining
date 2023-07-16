import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayAvance.styles";

export function ChangeDisplayAvance(props) {
  const { onClose, formik, setAvance } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <Input
          placeholder="Avance de Ejecucion"
          // editable={true}
          keyboardType="numeric"
          onChangeText={(text) => setText(text)}
          errorMessage={formik.errors.NumeroAIT}
        />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            if (text > 100) {
              alert("No numeros mayores que 100");
              onClose();
            } else {
              setAvance(text.toString());
              onClose();
              formik.setFieldValue("porcentajeAvance", text.toString());
            }
          }}
          // loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
}

import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayNumeroCot.styles";

export function ChangeDisplaynumeroCot(props) {
  const { onClose, setNumerocotizacion, formik } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <Input
          placeholder="Numero de Cotizacion"
          // editable={true}
          // keyboardType="numeric"
          onChangeText={(text) => setText(text)}
          errorMessage={formik.errors.NumeroAIT}
        />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            setNumerocotizacion(text.toString());
            onClose();
            formik.setFieldValue("NumeroCotizacion", text.toString());
          }}
          // loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
}

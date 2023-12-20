import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayHH.styles";

export function ChangeDisplayHH(props) {
  const { onClose, setHorashombre, formik } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <Input
          placeholder="Horas Hombre en Cotizacion"
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
            setHorashombre(text.toString());
            onClose();
            formik.setFieldValue("HHModificado", text.toString());
          }}
          loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
}

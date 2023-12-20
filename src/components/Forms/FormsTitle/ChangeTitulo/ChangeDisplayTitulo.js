import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayTitulo.styles";
import { SelectExample } from "./Selection";

export function ChangeDisplayTitulo(props) {
  const { onClose, formik, setTitulo } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <SelectExample setText={setText} formik={formik} />
        <Button
          title="Aceptar"
          testID="change-display-titulo"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            setTitulo(text.toString());
            formik.setFieldValue("titulo", text.toString());
            onClose();
          }}
          loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
}

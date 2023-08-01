import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayFileTipo.styles";
import { SelectExample } from "./Selection";

export function ChangeDisplayFileTipo(props) {
  const { onClose, formik, setTipoFile } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <SelectExample setText={setText} formik={formik} />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            setTipoFile(text.toString());
            formik.setFieldValue("tipoFile", text.toString());
            onClose();
          }}
          // loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}

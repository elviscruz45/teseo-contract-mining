import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayEtapa.styles";
import { SelectExample } from "./Selection";

export function ChangeDisplayEtapa(props) {
  const { onClose, formik, setEtapa } = props;
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
            setEtapa(text.toString());
            formik.setFieldValue("etapa", text.toString());
            onClose();
          }}
          // loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}

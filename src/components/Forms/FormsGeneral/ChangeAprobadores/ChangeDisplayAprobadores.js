import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { styles } from "./ChangeDisplayAprobadores.styles";
import { MultiSelectExample } from "./MultiSelection";

export function ChangeDisplayAprobadores(props) {
  const { onClose, formik, setAprobadores } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <MultiSelectExample formik={formik} setText={setText} />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            setAprobadores(text.toString());
            formik.setFieldValue("aprobacion", text.join(","));

            onClose();
          }} // loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}

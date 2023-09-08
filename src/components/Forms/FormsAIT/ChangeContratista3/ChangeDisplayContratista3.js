import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { styles } from "./ChangeDisplayContratista.styles";
import { MultiSelectExample } from "./MultiSelection";

export function ChangeDisplayAdminContratista3(props) {
  const { onClose, formik, setResponsableempresacontratista3 } = props;
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
            setResponsableempresacontratista3(text.toString());
            formik.setFieldValue(
              "ResponsableEmpresaContratista3",
              text.toString()
            );

            onClose();
          }} // loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}

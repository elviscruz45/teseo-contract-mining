import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { styles } from "./ChangeDisplayContratos.styles";
import { MultiSelectExample } from "./MultiSelection";

export function ChangeDisplayAdminContracts2(props) {
  const { onClose, formik, setResponsableempresausuario2 } = props;
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
            setResponsableempresausuario2(text.toString());
            formik.setFieldValue("ResponsableEmpresaUsuario2", text.join(","));

            onClose();
          }} // loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}

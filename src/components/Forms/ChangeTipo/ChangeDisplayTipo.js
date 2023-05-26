import React from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
// import { getAuth, updateProfile } from "firebase/auth";
// import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangeDisplayTipo.data";
import { styles } from "./ChangeDisplayTipo.styles";
import { MultiSelectExample } from "./MultiSelection";

export function ChangeDisplayTipo(props) {
  const { onClose, formik, handleTipo } = props;
  const formik2 = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      const tipo = formValue.tipo;
      formik.setFieldValue("tipo", tipo);
      handleTipo(tipo);
      onClose();
    },
  });

  return (
    <View>
      <View style={styles.content}>
        <MultiSelectExample formik={formik2} />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik2.handleSubmit}
          loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
}

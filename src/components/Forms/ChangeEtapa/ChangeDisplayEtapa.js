import React from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
// import { getAuth, updateProfile } from "firebase/auth";
// import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangeDisplayEtapa.data";
import { styles } from "./ChangeDisplayEtapa.styles";
import { SelectExample } from "./Selection";

export function ChangeDisplayEtapa(props) {
  const { onClose, formik, handleEtapa } = props;
  const formik2 = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      const etapa = formValue.etapa;
      formik.setFieldValue("etapa", etapa);
      handleEtapa(etapa);
      onClose();
    },
  });

  return (
    <View>
      <View style={styles.content}>
        <SelectExample formik={formik2} />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik2.handleSubmit}
          loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}

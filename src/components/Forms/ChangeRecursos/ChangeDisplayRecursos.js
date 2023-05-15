import React from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
// import { getAuth, updateProfile } from "firebase/auth";
// import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangeDisplayRecursos.data";
import { styles } from "./ChangeDisplayRecursos.styles";
import { MultiSelectExample } from "./MultiSelection";

export function ChangeDisplayRecursos(props) {
  const { onClose, formik, handleRecursos } = props;
  const formik2 = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      const recursos = formValue.recursos;
      formik.setFieldValue("recursos", recursos);
      handleRecursos(recursos);
      console.log(recursos);
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

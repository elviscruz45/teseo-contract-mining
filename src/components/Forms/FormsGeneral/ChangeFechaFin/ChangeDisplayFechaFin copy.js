import React from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
// import { getAuth, updateProfile } from "firebase/auth";
// import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangeDisplayFechaFin.data";
import { styles } from "./ChangeDisplayFechaFin.styles";
import { MultiSelectExample } from "./MultiSelection";

export function ChangeDisplayFechaFin(props) {
  const { onClose, formik, setFechafin } = props;

  const formik2 = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      const equipoTrabajo = formValue.equipoTrabajo;
      handleEquipoTrabajo(equipoTrabajo);
      formik.setFieldValue("equipoTrabajo", equipoTrabajo);
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
          loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}

import React from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
// import { getAuth, updateProfile } from "firebase/auth";
// import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangeDisplayPosition.data";
import { styles } from "./ChangeDisplayPosition.styles";
import { Pickermode } from "./Pickermode";

export function ChangeDisplayPosition(props) {
  const { onClose, handlerenderComponentPosition, formik } = props;
  const formik2 = useFormik({
    initialValues: initialValues(),
    // validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      onClose();
      const posicion = `${formValue.Position}`;
      handlerenderComponentPosition(posicion);
      formik.setFieldValue("posicion", posicion);

      // try {
      //   const { displayName } = formValue;
      //   const currentUser = getAuth().currentUser;
      //   await updateProfile(currentUser, { displayName });
      //   onReload();
      //   onClose();
      // } catch (error) {
      //   Toast.show({
      //     type: "error",
      //     position: "bottom",
      //     text1: "Error al cambiar el nombre y apellidos",
      //   });
      // }
    },
  });

  return (
    <View>
      <View style={styles.content}>
        <Pickermode formik2={formik2} />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik2.handleSubmit}
          // loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
}

import React, { useEffect } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
// import { getAuth, updateProfile } from "firebase/auth";
// import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangeDisplayBelt.data";
import { styles } from "./ChangeDisplayBelt.styles";
import { Pickermode } from "./Pickermode";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function ChangeDisplayBelt(props) {
  const { onClose, handlerenderComponent, formik } = props;
  const formik2 = useFormik({
    initialValues: initialValues(),
    // validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      const numeroFaja = `${formValue.Plant}${formValue.Number1}${formValue.Number2}`;
      formik.setFieldValue("numeroFaja", numeroFaja);

      onClose();
      handlerenderComponent(numeroFaja);
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
    <KeyboardAwareScrollView>
      <View>
        <View style={styles.content}>
          <Pickermode formik2={formik2} formik={formik} />
          <Button
            title="Aceptar"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={formik2.handleSubmit}
            // loading={formik.isSubmitting}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

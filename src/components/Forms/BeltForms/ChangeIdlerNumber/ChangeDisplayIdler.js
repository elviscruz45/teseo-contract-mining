import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
// import { getAuth, updateProfile } from "firebase/auth";
// import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangeDisplayIdler.data";
import { styles } from "./ChangeDisplayIdler.styles";
import { Pickermode } from "./Pickermode";

export function ChangeDisplayIdler(props) {
  const { onClose, handlerenderComponentIdler, formik } = props;
  const [text, setText] = useState("");
  // const formik2 = useFormik({
  //   initialValues: initialValues(),
  //   // validationSchema: validationSchema(),
  //   validateOnChange: false,
  //   onSubmit: (formValue) => {
  //     onClose();
  //     const numeroPolin = `${formValue.Number1}${formValue.Number2}`;
  //     handlerenderComponentIdler(numeroPolin);
  //     formik.setFieldValue("numeroPolin", numeroPolin);

  //     // try {
  //     //   const { displayName } = formValue;
  //     //   const currentUser = getAuth().currentUser;
  //     //   await updateProfile(currentUser, { displayName });
  //     //   onReload();
  //     //   onClose();
  //     // } catch (error) {
  //     //   Toast.show({
  //     //     type: "error",
  //     //     position: "bottom",
  //     //     text1: "Error al cambiar el nombre y apellidos",
  //     //   });
  //     // }
  //   },
  // });

  return (
    <View>
      <View style={styles.content}>
        <Input
          placeholder="Numero de Polin"
          // editable={true}
          keyboardType="numeric"
          onChangeText={(item) => setText(item.replace(/^0+/, ""))}
          errorMessage={formik.errors.numeroPolin}
        />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            handlerenderComponentIdler(text.toString());
            onClose();
            formik.setFieldValue("numeroPolin", text.toString());
          }}
          // loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
}

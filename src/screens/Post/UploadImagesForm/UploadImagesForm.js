import { View, Text } from "react-native";
import React from "react";
import { useFormik } from "formik";

export function UploadImagesForm() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {},
  });
  return (
    <View>
      <Text>UploadImagesForm</Text>
    </View>
  );
}

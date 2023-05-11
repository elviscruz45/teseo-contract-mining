import { View, Text, Linking, Button } from "react-native";
import React, { useState } from "react";
import { styles } from "./GeneralForms.styles";
import { Input } from "@rneui/themed";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export function GeneralForms(props) {
  const { formik } = props;
  const [pickedDocument, setPickedDocument] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (result.type === "success") {
        setPickedDocument(result.uri);
      } else {
        setPickedDocument(null);
      }
    } catch (err) {
      console.log("Error picking document", err);
    }
  };

  const openDocument = async () => {
    try {
      const pdfData = await FileSystem.readAsStringAsync(pickedDocument, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setPdfBase64(`data:application/pdf;base64,${pdfData}`);
    } catch (err) {
      console.log("Error reading PDF file", err);
    }
  };
  return (
    <View>
      <Text></Text>
      <View style={styles.content}>
        <Input
          placeholder="Nombre del Componente"
          // editable={false}
          onChangeText={(text) => {
            formik.setFieldValue("nombreComponente", text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => console.log("cambiar"),
          }}
        />
        <Input
          placeholder="Supervisor"
          // editable={false}
          onChangeText={(text) => {
            formik.setFieldValue("supervisor", text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => console.log("cambiar"),
          }}
        />
        <Input
          placeholder="Equipo de Trabajo"
          onChangeText={(text) => {
            formik.setFieldValue("equipoTrabajo", text);
          }}
        />
        <Input
          placeholder="Recursos Usados"
          // editable={false}
          onChangeText={(text) => {
            formik.setFieldValue("recursos", text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => console.log("cambiar"),
          }}
        />

        <Input
          value={pickedDocument}
          placeholder="Adjuntar PDF"
          multiline={true}
          editable={false}
          onChangeText={(text) => {
            formik.setFieldValue("pdfFile", text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => pickDocument(),
          }}
        />
      </View>
    </View>
  );
}

import { View, Text } from "react-native";
import React from "react";
import { styles } from "./GeneralForms.styles";
import { Input } from "@rneui/themed";

export function GeneralForms(props) {
  const { formik } = props;

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
      </View>
    </View>
  );
}

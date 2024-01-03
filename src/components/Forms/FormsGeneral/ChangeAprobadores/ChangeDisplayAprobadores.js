import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayAprobadores.styles";
import { MultiSelectExample } from "./MultiSelection";
import Toast from "react-native-toast-message";

export function ChangeDisplayAprobadores(props) {
  const { onClose, formik, setAprobadores, etapa } = props;
  const [text, setText] = useState([]);

  return (
    <View>
      <View style={styles.content}>
        <MultiSelectExample formik={formik} setText={setText} />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            if (
              etapa === "Usuario-Envio Solicitud Servicio" ||
              etapa === "Contratista-Envio Cotizacion" ||
              etapa === "Contratista-Solicitud Ampliacion Servicio" ||
              etapa === "Contratista-Envio EDP" ||
              etapa === "Contratista-Solicitud Aprobacion Doc"
            ) {
              setAprobadores(text.join(","));
              formik.setFieldValue("aprobacion", text.join(","));
              onClose();
            } else {
              Toast.show({
                type: "error",
                position: "bottom",
                text1: "No requiere Aprobacion/No autorizado",
              });
              onClose();
            }
          }} // loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}

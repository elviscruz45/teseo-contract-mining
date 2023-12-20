import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayEtapa.styles";
import { SelectExample } from "./Selection";

export function ChangeDisplayEtapa(props) {
  const { onClose, formik, setEtapa, setAprobadores, etapa } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <SelectExample setText={setText} formik={formik} />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            setEtapa(text.toString());
            formik.setFieldValue("etapa", text.toString());
            if (etapa !== "Contratista-Envio Cotizacion") {
              setAprobadores(null);
            } else if (etapa !== "Contratista-Solicitud Ampliacion Servicio") {
              setAprobadores(null);
            } else if (etapa !== "Contratista-Envio EDP") {
              setAprobadores(null);
            }
            onClose();
          }}
          loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
}

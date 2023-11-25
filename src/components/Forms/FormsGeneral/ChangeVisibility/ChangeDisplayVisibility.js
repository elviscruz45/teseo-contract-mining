import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayVisibility.styles";
import { SelectExample } from "./Selection";

export function ChangeDisplayVisibility(props) {
  const { onClose, formik, setVisibilidad } = props;
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
            setVisibilidad(text.toString());
            formik.setFieldValue("visibilidad", text.toString());
            // if (etapa !== "Contratista-Envio Cotizacion") {
            //   setAprobadores(null);
            // } else if (etapa !== "Contratista-Solicitud Ampliacion Servicio") {
            //   setAprobadores(null);
            // } else if (etapa !== "Contratista-Envio EDP") {
            //   setAprobadores(null);
            // }
            onClose();
          }}
          // loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}

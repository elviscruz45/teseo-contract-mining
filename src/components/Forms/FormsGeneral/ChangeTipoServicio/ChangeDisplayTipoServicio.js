import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";

import { styles } from "./ChangeDisplayTipoServicio.styles";
import { SelectExample } from "./Selection";

export function ChangeDisplayTipoServicio(props) {
  const { onClose, formik, setTiposervicio, setTiposerv } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <SelectExample formik={formik} setText={setText} />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            setTiposervicio(text.toString());
            setTiposerv(text.toString());
            formik.setFieldValue("TipoServicio", text.toString());
            onClose();
          }}
          loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
}

import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayContratista.styles";
import { MultiSelectExample } from "./MultiSelection";

export function ChangeDisplayAdminContratista(props) {
  const { onClose, formik, setResponsableempresacontratista } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <MultiSelectExample formik={formik} setText={setText} />
        <Button
          title="Aceptar"
          testID="ChangeDisplayAdminContratista:Button"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            setResponsableempresacontratista(text.toString());
            formik.setFieldValue(
              "ResponsableEmpresaContratista",
              text.toString()
            );

            onClose();
          }} // loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}

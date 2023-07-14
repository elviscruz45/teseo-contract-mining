import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayArea.styles";
import { SelectExample } from "./Selection";

export function ChangeDisplayArea(props) {
  const { onClose, formik, setAreaservicio, setArea } = props;
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
            setAreaservicio(text.toString());
            setArea(text.toString());
            formik.setFieldValue("AreaServicio", text.toString());

            onClose();
          }}
          // loading={formik2.isSubmitting}
        />
      </View>
    </View>
  );
}

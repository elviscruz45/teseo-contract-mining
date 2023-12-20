import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeDisplayNumeroAIT.styles";

export function ChangeDisplaynumeroAIT(props) {
  const { onClose, setnumeroAIT, formik, setAit } = props;
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.content}>
        <Input
          placeholder="Numero de AIT"
          // editable={true}
          keyboardType="numeric"
          onChangeText={(text) => setText(text)}
          errorMessage={formik.errors.NumeroAIT}
        />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            setnumeroAIT(text.toString());
            setAit(text.toString());
            onClose();
            formik.setFieldValue("NumeroAIT", text.toString());
          }}
          loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
}

import { View, Text, Platform } from "react-native";
import React, { useState, useRef } from "react";
import { Input, Button } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./Pickermode.styles";

export function Pickermode(props) {
  const { formik2 } = props;
  const pickerRef = useRef();
  const [selected, setSelected] = useState("Retorno");

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  function saveProperty(itemValue) {
    setSelected(itemValue);
    formik2.setFieldValue("Zone", itemValue);
  }

  return (
    <>
      <View style={styles.content}>
        <Picker
          ref={pickerRef}
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) => saveProperty(itemValue)}
        >
          <Picker.Item label="Retorno" value="Retorno" />
          <Picker.Item label="Impacto" value="Impacto" />
          <Picker.Item label="Carga" value="Carga" />
          <Picker.Item label="Descarga" value="Descarga" />
        </Picker>
      </View>
    </>
  );
}

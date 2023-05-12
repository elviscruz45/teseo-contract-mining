import { View, Text, Platform } from "react-native";
import React, { useState, useRef } from "react";
import { Input, Button } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./Pickermode.styles";

export function Pickermode(props) {
  const { formik2 } = props;
  const pickerRef = useRef();
  const [selected, setSelected] = useState("Derecho");

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  function saveProperty(itemValue) {
    setSelected(itemValue);
    formik2.setFieldValue("Position", itemValue);
  }

  return (
    <>
      <View style={styles.content}>
        <Picker
          ref={pickerRef}
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) => saveProperty(itemValue)}
        >
          <Picker.Item label="Derecho" value="Derecho" />
          <Picker.Item label="Central" value="Central" />
          <Picker.Item label="Izquierdo" value="Izquierdo" />
        </Picker>
      </View>
    </>
  );
}

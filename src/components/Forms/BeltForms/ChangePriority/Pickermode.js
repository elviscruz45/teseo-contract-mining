import { View, Text, Platform } from "react-native";
import React, { useState, useRef } from "react";
import { Input, Button } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./Pickermode.styles";

export function Pickermode(props) {
  const { formik2 } = props;
  const pickerRef = useRef();
  const [selected, setSelected] = useState("3_Normal");

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  function saveProperty(itemValue) {
    setSelected(itemValue);
    formik2.setFieldValue("Priority", itemValue);
  }

  return (
    <>
      <View style={styles.content}>
        <Picker
          ref={pickerRef}
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) => saveProperty(itemValue)}
        >
          <Picker.Item label="1_Critico" value="1_Critico" />
          <Picker.Item label="2_Advertencia" value="2_Advertencia" />
          <Picker.Item label="3_Normal" value="3_Normal" />
        </Picker>
      </View>
    </>
  );
}

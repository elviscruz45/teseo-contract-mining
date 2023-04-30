import { View, Text, Platform } from "react-native";
import React, { useState, useRef } from "react";
import { Input, Button } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./Pickermode.styles";

export function Pickermode(props) {
  const { formik2, formik } = props;
  const pickerRef = useRef();
  const [selectedPlant, setselectedPlant] = useState("C1");
  const [selectedNumber1, setSelectedNumber1] = useState("-CV-");
  const [selectedNumber2, setSelectedNumber2] = useState("00");

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  function saveBeltproperty(itemValue) {
    setselectedPlant(itemValue);
    formik2.setFieldValue("Plant", itemValue);
  }
  function saveNumber1property(itemValue) {
    setSelectedNumber1(itemValue);
    formik2.setFieldValue("Number1", itemValue);
  }
  function saveNumber2property(itemValue) {
    setSelectedNumber2(itemValue);
    formik2.setFieldValue("Number2", itemValue);
  }
  return (
    <>
      <Text style={styles.text}>
        {"Tag: "}
        {selectedPlant}
        {selectedNumber1}
        {selectedNumber2}
      </Text>
      <View style={styles.content}>
        <Picker
          ref={pickerRef}
          selectedValue={selectedPlant}
          onValueChange={(itemValue, itemIndex) => saveBeltproperty(itemValue)}
        >
          <Picker.Item label="C1" value="C1" />
          <Picker.Item label="C2" value="C2" />
        </Picker>

        <Picker
          selectedValue={selectedNumber1}
          onValueChange={(itemValue, itemIndex) =>
            saveNumber1property(itemValue)
          }
        >
          <Picker.Item label="-CV-" value="-CV-" />
          <Picker.Item label="-FE-" value="-FE-" />
        </Picker>
        <Input
          placeholder="Coloque el numero de Faja"
          // editable={true}
          keyboardType="numeric"
          onChangeText={(itemValue, itemIndex) =>
            saveNumber2property(itemValue.replace(/^0+/, ""))
          }
          errorMessage={formik2.errors.Number2}
        />
        {/* <Picker
          selectedValue={selectedNumber2}
          onValueChange={(itemValue, itemIndex) =>
            saveNumber2property(itemValue)
          }
        >
          {Array.from(Array(100).keys()).map((number) => (
            <Picker.Item
              key={number}
              label={String(number)}
              value={String(number)}
            />
          ))}
        </Picker> */}
      </View>
    </>
  );
}

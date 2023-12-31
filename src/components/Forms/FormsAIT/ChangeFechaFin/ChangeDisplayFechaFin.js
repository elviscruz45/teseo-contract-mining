import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "@rneui/themed";
import { initialValues, validationSchema } from "./ChangeDisplayFechaFin.data";
import { styles } from "./ChangeDisplayFechaFin.styles";
import { MultiSelectExample } from "./MultiSelection";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

export function ChangeDisplayFechaFin(props) {
  const { onClose, formik, setFechafin } = props;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setFechafin(currentDate.toLocaleString());
    formik.setFieldValue("FechaFin", currentDate);
    onClose();
  };

  return (
    <SafeAreaView>
      {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
}

import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Platform, Button } from "react-native";

export function ChangeDisplayFechaInicio(props) {
  const { onClose, formik, setFechaInicio, showTimePicker, setShowTimePicker } =
    props;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setFechaInicio(currentDate);
    formik.setFieldValue("FechaInicio", currentDate);
    onClose();
  };
  useEffect(() => {
    if (show === false) setShow(true);
  }, []);

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: mode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode();
  };

  if (Platform.OS === "ios") {
    return (
      <SafeAreaView>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            style={{ alignSelf: "center", backgroundColor: "#2A3B76" }}
          />
        )}
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <Button onPress={showDatepicker} title="Calendario" />
      </SafeAreaView>
    );
  }
}

import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Button } from "@rneui/base";
import { styles } from "./ProfileDateScreen.styles";
import { connect } from "react-redux";
import { EquipmentListUpper } from "../../../actions/home";
import DateTimePicker from "@react-native-community/datetimepicker";

function ProfileDateScreenNoRedux(props) {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [ios, setIos] = useState(false);
  const [androidDateStart, setAndroidDateStart] = useState(false);
  const [androidDateEnd, setAndroidDateEnd] = useState(false);
  const [androidDate, setAndroidDate] = useState(false);
  const [filtroText, setFiltroText] = useState("Sin Filtro");

  const { filterButton, quitFilterButton } = props;

  useEffect(() => {
    if (Platform.OS === "android") {
      setIos(false);
      setAndroidDate(true);
      // for iOS, add a button that closes the picker
    } else if (Platform.OS === "ios") {
      setIos(true);
      setAndroidDate(false);
      setAndroidDateStart(false);
      setAndroidDateEnd(false);
    }
  }, []);

  const filter = () => {
    setFiltroText("Con Filtro");
    const startDate = dateStart.getTime();
    const endDate = dateEnd.getTime();
    const timeDifference = endDate - startDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (dateStart > dateEnd) {
      alert("La fecha de inicio no puede ser mayor a la fecha de fin");
    } else if (daysDifference >= 31) {
      alert("La diferencia entre las fechas no debe ser mayor a 31 días");
    } else if (startDate > new Date()) {
      alert("La fecha de inicio no puede ser mayor a la fecha de hoy");
    } else {
      filterButton(dateStart, dateEnd);
    }
  };

  const QuitFilter = () => {
    setFiltroText("Sin Filtro");
    setDateEnd(new Date());
    setDateStart(new Date());
    quitFilterButton(dateStart, dateEnd);
  };

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate;
    setAndroidDateStart(false);
    setDateStart(currentDate);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setAndroidDateEnd(false);
    setDateEnd(currentDate);
  };

  const showDatepickerStart = () => {
    setAndroidDateStart(true);
  };

  const showDatepickerEnd = () => {
    setAndroidDateEnd(true);
  };

  return (
    <>
      <View style={[styles.row, styles.center]}>
        <Text></Text>

        <Text>Inicio</Text>
        {androidDate && (
          <Button
            onPress={showDatepickerStart}
            color={"#2A3B76"}
            // style={{ shadowColor: "black" }}
            title={`${dateStart.toLocaleDateString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}`}
          />
        )}
        {ios && (
          <DateTimePicker
            testID="dateTimePickerStart"
            value={dateStart}
            mode={"date"}
            is24Hour={true}
            onChange={onChangeStart}
          />
        )}
        <Text>Fin</Text>

        {androidDate && (
          <Button
            onPress={showDatepickerEnd}
            color={"#2A3B76"}
            title={`${dateEnd.toLocaleDateString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}`}
          />
        )}
        {androidDateStart && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateStart}
            mode={"date"}
            is24Hour={true}
            onChange={onChangeStart}
          />
        )}
        {androidDateEnd && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateEnd}
            mode={"date"}
            is24Hour={true}
            onChange={onChangeEnd}
          />
        )}

        {ios && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateEnd}
            mode={"date"}
            is24Hour={true}
            onChange={onChangeEnd}
          />
        )}

        <Text></Text>

        <Text></Text>
      </View>

      <Text></Text>

      <View style={[styles.row1]}>
        <View style={styles.filterViewButton}>
          <TouchableOpacity
            style={
              filtroText === "Con Filtro"
                ? styles.filterbutton
                : styles.filterbutton2
            }
            onPress={() => filter()}
          >
            <Text style={styles.filterButtonText}>Filtrar</Text>
          </TouchableOpacity>
        </View>
        <Text> </Text>

        <View style={styles.filterViewButton}>
          <TouchableOpacity
            style={
              filtroText === "Sin Filtro"
                ? styles.filterbutton
                : styles.filterbutton2
            }
            onPress={() => QuitFilter()}
          >
            <Text style={styles.filterButtonText}>Sin Filtro</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text></Text>
      <Text></Text>
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {};
};

export const ProfileDateScreen = connect(mapStateToProps, {
  EquipmentListUpper,
})(ProfileDateScreenNoRedux);

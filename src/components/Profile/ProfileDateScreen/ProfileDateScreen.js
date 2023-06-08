import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  where,
} from "firebase/firestore";
import { Input, Button } from "@rneui/base";
import { Image as ImageExpo } from "expo-image";
import { equipmentList } from "../../../utils/equipmentList";
import { equipmentEmpty } from "../../../utils/equipmentList";
import { styles } from "./ProfileDateScreen.styles";
import { connect } from "react-redux";
import { db } from "../../../utils";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { EquipmentListUpper } from "../../../actions/home";
import DateTimePicker from "@react-native-community/datetimepicker";

function ProfileDateScreenNoRedux(props) {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const { filterButton, quitFilterButton } = props;

  const filter = () => {
    filterButton(dateStart, dateEnd);
  };

  const QuitFilter = () => {
    quitFilterButton(dateStart, dateEnd);
  };
  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateStart(currentDate);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateEnd(currentDate);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <>
      <View style={[styles.row, styles.center]}>
        <Text></Text>

        <Text>Inicio:</Text>
        <DateTimePicker
          testID="dateTimePickerStart"
          value={dateStart}
          mode={"date"}
          is24Hour={true}
          onChange={onChangeStart}
        />
        <Text>Fin:</Text>

        <DateTimePicker
          testID="dateTimePicker"
          value={dateEnd}
          mode={"date"}
          is24Hour={true}
          onChange={onChangeEnd}
        />
        <Button onPress={filter} title={"Filtrar"} />
        <Text></Text>

        <Button onPress={QuitFilter} title={"x"} />
        <Text></Text>

        <Text></Text>
      </View>
      <Text></Text>
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    ActualPostFirebase: reducers.post.ActualPostFirebase,
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    profile: reducers.profile.profile,
    uid: reducers.profile.uid,
    equipmentListHeader: reducers.home.equipmentList,
  };
};

export const ProfileDateScreen = connect(mapStateToProps, {
  EquipmentListUpper,
})(ProfileDateScreenNoRedux);

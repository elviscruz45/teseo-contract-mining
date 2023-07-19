import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
  Linking,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./FileScreen.styles";
import { SearchBar, Icon, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import { equipmentList } from "../../../utils/equipmentList";
import { db } from "../../../utils";
import { screen } from "../../../utils";
import { getExcelEquipo } from "../../../utils/excelData";
import { connect } from "react-redux";
import { saveActualEquipment } from "../../../actions/post";
import { EquipmentListUpper } from "../../../actions/home";
import { DateScreen } from "../../../components/Post/DateScreen/DateScreen";
import { areaLists } from "../../../utils/areaList";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function FileScreen(props) {
  const {
    route: {
      params: { Item },
    },
  } = props;
  return (
    <KeyboardAwareScrollView>
      <Text></Text>

      <Text style={styles.name}>{Item.NombreServicio}</Text>
      <Text></Text>
    </KeyboardAwareScrollView>
  );
}

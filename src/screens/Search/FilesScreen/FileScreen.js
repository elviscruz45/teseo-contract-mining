import React, { useState, useEffect, useContext, useCallback } from "react";
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

  const uploadFile = useCallback(async (uri) => {
    console.log("pdfFILESCREEN", uri);

    try {
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        alert("Unable to open PDF document");
      }
    } catch (error) {
      alert("Error opening PDF document", error);
    }
  }, []);

  return (
    <KeyboardAwareScrollView>
      <Text></Text>

      <Text style={styles.name}>{Item.NombreServicio}</Text>
      <Text></Text>

      <FlatList
        data={Item.pdfFile}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => uploadFile(item)}>
              <View />
              <View>
                <View style={styles.equipments2}>
                  <ImageExpo
                    source={require("../../../../assets/pdf4.png")}
                    style={styles.image2}
                    cachePolicy={"memory-disk"}
                  />
                  <View>
                    <Text style={styles.info2}>{item}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item} // Provide a unique key for each item
      />
    </KeyboardAwareScrollView>
  );
}

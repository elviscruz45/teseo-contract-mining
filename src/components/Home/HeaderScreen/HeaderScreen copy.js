import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { styles } from "./HeaderScreen.styles";
import { connect } from "react-redux";
import { db } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { EquipmentListUpper } from "../../../actions/home";
import { screen } from "../../../utils";
import { areaLists } from "../../../utils/areaList";
import { CircularProgress } from "./CircularProgress";

function HeaderScreenNoRedux(props) {
  const navigation = useNavigation();
  const [data, setData] = useState();
  console.log("RenderHeaderScreenNoRedux");

  useEffect(() => {
    // console.log("props.totalEventServiceAITLIST");
    async function fetchData() {
      q = query(
        collection(db, "ServiciosAIT"),
        orderBy("LastEventPosted", "desc"),
        limit(50) // Add the desired limit value here
      );
      const querySnapshot = await getDocs(q);
      const lista = [];
      querySnapshot.forEach((doc) => {
        lista.push(doc.data());
      });
      console.log("querySnapshot HeaderScreenNoRedux");

      setData(lista);
    }
    fetchData();
  }, [props.totalEventServiceAITLIST]);

  // props.totalEventServiceAITLIST
  const selectAsset = (item) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: item },
    });
  };

  // create an algorithm to reduce the total text of the service description

  const ShortTextComponent = (item) => {
    const longText = item;
    const maxLength = 20; // Maximum length of the short text
    let shortText = longText;
    if (longText.length > maxLength) {
      shortText = `${longText.substring(0, maxLength)}...`;
    }

    return <Text style={styles.Texticons}>{shortText}</Text>;
  };

  return (
    <>
      <FlatList
        style={{
          backgroundColor: "white",
          paddingTop: 10,
          paddingVertical: 10,
        }} // Add backgroundColor here
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => {
          //the algoritm to retrieve the image source to render the icon
          const area = item.AreaServicio;
          const indexareaList = areaLists.findIndex(
            (item) => item.value === area
          );
          const imageSource = areaLists[indexareaList]?.image;
          return (
            <TouchableOpacity onPress={() => selectAsset(item)}>
              <View style={styles.textImage}>
                <CircularProgress
                  imageSource={imageSource}
                  imageStyle={styles.roundImage5}
                  avance={item.AvanceEjecucion}
                />
                {ShortTextComponent(item.NombreServicio)}
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.NumeroAIT} // Provide a unique key for each item
      />
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
    ActualServiceAITList: reducers.post.ActualServiceAITList,
    totalEventServiceAITLIST: reducers.home.totalEventServiceAITLIST,
  };
};

export const HeaderScreen = connect(mapStateToProps, { EquipmentListUpper })(
  HeaderScreenNoRedux
);

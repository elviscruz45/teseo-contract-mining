import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { styles } from "./HeaderScreen.styles";
import { connect } from "react-redux";
import { db } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { areaLists } from "../../../utils/areaList";
import { CircularProgress } from "./CircularProgress";
import { saveActualAITServicesFirebaseGlobalState } from "../../../actions/post";
import { updateAITServicesDATA } from "../../../actions/home";
import { saveApprovalListnew } from "../../../actions/search";

function HeaderScreenNoRedux(props) {
  const navigation = useNavigation();
  const [data, setData] = useState();
  //Data about the company belong this event
  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  const regex = /@(.+?)\./i;

  useEffect(() => {
    let unsubscribe;
    if (props.email) {
      const companyName =
        capitalizeFirstLetter(props.email?.match(regex)?.[1]) || "Anonimo";

      function fetchData() {
        let queryRef;
        if (companyName === "Fmi") {
          queryRef = query(
            collection(db, "ServiciosAIT"),
            where("AvanceAdministrativoTexto", "!=", "Contratista-Fin servicio")
          );
        } else {
          queryRef = query(
            collection(db, "ServiciosAIT"),
            where(
              "AvanceAdministrativoTexto",
              "!=",
              "Contratista-Fin servicio"
            ),
            where("companyName", "==", companyName)
          );
        }

        unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
          const lista = [];
          ItemFirebase.forEach((doc) => {
            lista.push(doc.data());
          });
          //order the list by date
          lista.sort((a, b) => {
            return b.LastEventPosted - a.LastEventPosted;
          });

          setData(lista.slice(0, 50));
          props.updateAITServicesDATA(lista);
        });
      }
      fetchData();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [props.email]);

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
    <FlatList
      style={{
        backgroundColor: "white",
        paddingTop: 10,
        paddingVertical: 10,
      }}
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
          <TouchableOpacity onPress={() => selectAsset(item.idServiciosAIT)}>
            <View style={styles.textImage}>
              <CircularProgress
                imageSource={imageSource}
                imageStyle={styles.roundImage5}
                avance={item.AvanceEjecucion}
                image={item.photoServiceURL}
              />
              {ShortTextComponent(item.NombreServicio)}
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => `${item.fechaPostISO}`}
    />
  );
}

const mapStateToProps = (reducers) => {
  return {
    email: reducers.profile.email,
  };
};

export const HeaderScreen = connect(mapStateToProps, {
  // EquipmentListUpper,
  saveActualAITServicesFirebaseGlobalState,
  updateAITServicesDATA,
  saveApprovalListnew,
})(HeaderScreenNoRedux);

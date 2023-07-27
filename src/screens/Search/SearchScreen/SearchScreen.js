import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { styles } from "./SearchScreen.styles";
import { SearchBar, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { screen } from "../../../utils";
import { Image as ImageExpo } from "expo-image";
import { db } from "../../../utils";
import { connect } from "react-redux";
import { EquipmentListUpper } from "../../../actions/home";
import { areaLists } from "../../../utils/areaList";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const windowWidth = Dimensions.get("window").width;
function SearchScreenNoRedux(props) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const navigation = useNavigation();

  let AITServiceList = props.ActualServiceAITList;

  //This is used to retrieve the equipment we are searching for
  useEffect(() => {
    AITServiceList = props.ActualServiceAITList;
    console.log("SearchScreenUseEffect");
    if (searchText === "") {
      setSearchResults(AITServiceList);
    } else {
      const result = AITServiceList?.filter((item) => {
        const re = new RegExp(searchText, "ig");
        return (
          re.test(item.NombreServicio) ||
          re.test(item.NumeroAIT) ||
          re.test(item.NumeroCotizacion) ||
          re.test(item.TipoServicio)
        );
      });

      setSearchResults(result);
    }
  }, [searchText, props.ActualServiceAITList]);

  //this method is used to go to a screen to see the status of the item
  const selectAsset = (item) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: item },
    });
  };

  return (
    <KeyboardAwareScrollView>
      {console.log("priemra parte")}
      <SearchBar
        placeholder="Buscar Equipo"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      {/* {!searchResults && <Loading show text="Cargando" />} */}
      {console.log("segunda parte")}

      <FlatList
        data={searchResults}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          //the algoritm to retrieve the image source to render the icon

          const area = item.AreaServicio;
          const indexareaList = areaLists.findIndex(
            (item) => item.value === area
          );
          const imageSource = areaLists[indexareaList]?.image;
          // the algorithm to retrieve the amount with format
          const formattedAmount = new Intl.NumberFormat("en-US", {
            style: "decimal",
            useGrouping: true,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(item.Monto);

          return (
            <TouchableOpacity
              onPress={() => selectAsset(item)}
              style={{ backgroundColor: "white" }} // Add backgroundColor here
            >
              <View style={styles.equipments}>
                <ImageExpo
                  source={imageSource}
                  style={styles.image}
                  cachePolicy={"memory-disk"}
                />

                <View>
                  <Text style={styles.name}>{item.NombreServicio}</Text>
                  <Text style={styles.info}>
                    {"Codigo Servicio: "}
                    {item.NumeroAIT}
                  </Text>
                  <Text style={styles.info}>
                    {"Tipo: "}
                    {item.TipoServicio}
                  </Text>

                  <Text style={styles.info}>
                    {"Fecha Inicio: "}
                    {item.fechaPostFormato}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.NumeroAIT}
      />
    </KeyboardAwareScrollView>
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

    ActualServiceAITList: reducers.post.ActualServiceAITList,
  };
};

export const SearchScreen = connect(mapStateToProps, { EquipmentListUpper })(
  SearchScreenNoRedux
);

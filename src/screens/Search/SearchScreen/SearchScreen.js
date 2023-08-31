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

const windowWidth = Dimensions.get("window").width;
function SearchScreenNoRedux(props) {
  console.log("SearchScreenNoRedux");

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const navigation = useNavigation();

  let AITServiceList = props.servicesData;

  //This is used to retrieve the equipment we are searching for
  useEffect(() => {
    AITServiceList = props.servicesData;
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
  }, [searchText, props.servicesData]);

  //this method is used to go to a screen to see the status of the item
  const selectAsset = (idServiciosAIT) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: idServiciosAIT },
    });
  };

  return (
    <FlatList
      data={searchResults}
      ListHeaderComponent={
        <SearchBar
          placeholder="Buscar AIT o nombre del servicio"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          lightTheme={true}
          inputContainerStyle={{ backgroundColor: "white" }}
        />
      }
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
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
            onPress={() => selectAsset(item.idServiciosAIT)}
            style={{ backgroundColor: "white" }} // Add backgroundColor here
          >
            {console.log("FlatList SearchScreen")}
            <View style={styles.equipments}>
              {item.photoServiceURL ? (
                <ImageExpo
                  source={{ uri: item.photoServiceURL }}
                  style={styles.image}
                  cachePolicy={"memory-disk"}
                />
              ) : (
                <ImageExpo
                  source={imageSource}
                  style={styles.image}
                  cachePolicy={"memory-disk"}
                />
              )}

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
  );
}

const mapStateToProps = (reducers) => {
  return {
    servicesData: reducers.home.servicesData,
  };
};

export const SearchScreen = connect(mapStateToProps, { EquipmentListUpper })(
  SearchScreenNoRedux
);

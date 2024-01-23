import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./SearchScreen.styles";
import { SearchBar, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { Image as ImageExpo } from "expo-image";
import { connect } from "react-redux";
import { EquipmentListUpper } from "../../../actions/home";
import { areaLists } from "../../../utils/areaList";

function SearchScreenNoRedux(props) {
  // console.log("SearchScreenNoRedux");
  let AITServiceList;
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const navigation = useNavigation();

  //Data about the company belong this event
  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  const regex = /@(.+?)\./i;
  const companyName =
    capitalizeFirstLetter(props.email?.match(regex)?.[1]) || "Anonimo"; // console.log("searchResults", searchResults);

  // if (!data && !searchResults) {
  //   setData(props.servicesData);
  //   setSearchResults(props.servicesData?.slice(0, 100));
  // }

  //This is used to retrieve the the services we are filtering and sorting
  useEffect(() => {
    console.log("useEffect 222");
    AITServiceList = props.servicesData;
    if (Array.isArray(AITServiceList)) {
      let AITServiceListSorted = AITServiceList.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      setData(AITServiceListSorted);
      setSearchResults(AITServiceListSorted?.slice(0, 100));
    }
    console.log("useEffect fin 222");
  }, [props.servicesData]);

  useEffect(() => {
    console.log("useEffect 333");

    if (searchText === "") {
      setSearchResults(data?.slice(0, 100));
    } else {
      const result = data?.filter((item) => {
        const re = new RegExp(searchText, "ig");
        return (
          re.test(item.NombreServicio) ||
          re.test(item.NumeroAIT) ||
          re.test(item.NumeroCotizacion) ||
          re.test(item.TipoServicio) ||
          re.test(item.companyName)
        );
      });

      setSearchResults(result.slice(0, 50));
    }
    console.log("useEffect fin 3333");
  }, [searchText]);
  //to initialize the data in null
  console.log("xcreen");

  useEffect(() => {
    console.log("useEffect 111");
    if (!data && !searchResults) {
      setData(props.servicesData);
      setSearchResults(props.servicesData?.slice(0, 100));
    }
    console.log("useEffect fin 111");
  }, []);

  //this method is used to go to a screen to see the status of the item
  const selectAsset = (idServiciosAIT) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: idServiciosAIT },
    });
  };
  if (props.servicesData?.length === 0 || !props.email || !data) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 50,
            // fontFamily: "Arial",
            color: "#2A3B76",
          }}
        >
          Bienvenido
        </Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
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
              <View style={styles.equipments}>
                {item.photoServiceURL ? (
                  <ImageExpo
                    source={{ uri: item.photoServiceURL }}
                    style={styles.image}
                    cachePolicy={"memory-disk"}
                  />
                ) : (
                  <ImageExpo
                    source={
                      imageSource || require("../../../../assets/icon1.png")
                    }
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
                  {companyName !== item.companyName && (
                    <Text style={styles.info}>
                      {"Empresa: "}
                      {item.companyName}
                    </Text>
                  )}
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
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return {
    servicesData: reducers.home.servicesData,
    email: reducers.profile.email,
    // user_photo: reducers.profile.user_photo,
  };
};

export const SearchScreen = connect(mapStateToProps, { EquipmentListUpper })(
  SearchScreenNoRedux
);

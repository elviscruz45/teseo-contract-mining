import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "./SearchScreen.styles";
import { SearchBar, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { size, map } from "lodash";
import { equipmentList } from "../../../utils/equipmentList";
import { screen } from "../../../utils";

const windowWidth = Dimensions.get("window").width;
export function SearchScreen(props) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setSearchResults(equipmentList);
  }, []);

  useEffect(() => {
    const result = equipmentList.filter((item) => {
      const re = new RegExp(searchText, "ig");
      return re.test(item.nombre) || re.test(item.tag);
    });
    setSearchResults(result);
  }, [searchText]);

  const selectAsset = (item) => {
    console.log(item);
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: item },
    });
  };

  return (
    <>
      <SearchBar
        placeholder="Busca tu numero de polin o faja"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      {/* {!searchResults && <Loading show text="Cargando" />} */}

      <FlatList
        data={searchResults}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => selectAsset(item)}>
              <View style={styles.equipments}>
                <Image source={item.image} style={styles.image} />
                <View>
                  <Text style={styles.name}>{item.tag}</Text>
                  <Text style={styles.info}>{item.nombre}</Text>
                  <Text style={styles.info}>{item.caracteristicas}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}

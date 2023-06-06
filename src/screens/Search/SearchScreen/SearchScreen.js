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
  Pressable,
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
import { Image as ImageExpo } from "expo-image";

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
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: item },
    });
  };

  const pressFollow = (item) => {
    // setFollow((prev) => !prev);
  };

  return (
    <>
      <SearchBar
        placeholder="Buscar Equipo"
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
                <ImageExpo
                  source={item.image}
                  style={styles.image}
                  cachePolicy={"memory-disk"}
                />

                <View>
                  <Text style={styles.name}>{item.tag}</Text>
                  <Text style={styles.info}>{item.nombre}</Text>
                  <Text style={styles.info}>{item.caracteristicas}</Text>
                </View>
                {false ? (
                  <Pressable style={styles.buttonFollow} onPress={pressFollow}>
                    <Text style={styles.textFollow}>Following</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.buttonUnfollow}
                    onPress={pressFollow}
                  >
                    <Text style={styles.textFollow}>Follow</Text>
                  </Pressable>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}

import React, { useState, useContext, useCallback } from "react";
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
import { useNavigation } from "@react-navigation/native";

import { screen } from "../../../utils";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function FileScreen(props) {
  const {
    route: {
      params: { Item },
    },
  } = props;
  const navigation = useNavigation();
  const documents = Item.pdfFile.filter((item) => {
    return typeof item !== "string";
  });
  const uploadFile = useCallback(async (uri) => {
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

  const goToAddDocsForm = () => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.addDocs,
      // params: { Item: item },
    });
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <Text></Text>

      <Text style={styles.name}>{Item.NombreServicio}</Text>
      <Text></Text>
      <TouchableOpacity onPress={() => goToAddDocsForm()}>
        <ImageExpo
          source={require("../../../../assets/AddIcon2.png")}
          style={styles.image3}
          cachePolicy={"memory-disk"}
        />
      </TouchableOpacity>

      <FlatList
        data={documents}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => uploadFile(item.pdfPrincipal)}>
              <View style={{ marginBottom: 20 }}>
                <View style={styles.equipments2}>
                  <ImageExpo
                    source={require("../../../../assets/pdf4.png")}
                    style={styles.image2}
                    cachePolicy={"memory-disk"}
                  />
                  <View>
                    <View style={[{ flexDirection: "row" }]}>
                      <Text style={{ fontWeight: "bold" }}>{"Titulo: "}</Text>
                      <Text style={[styles.info2, { marginRight: "30%" }]}>
                        {item.FilenameTitle}
                      </Text>
                    </View>
                    <View style={[{ flexDirection: "row" }]}>
                      <Text style={{ fontWeight: "bold" }}>
                        {"Tipo de Documento: "}
                      </Text>
                      <Text style={styles.info2}>{item.tipoFile}</Text>
                    </View>
                    <View style={[{ flexDirection: "row" }]}>
                      <Text style={{ fontWeight: "bold" }}>{"Autor: "}</Text>
                      <Text style={styles.info2}>{item.email}</Text>
                    </View>

                    <View style={[{ flexDirection: "row" }]}>
                      <Text style={{ fontWeight: "bold" }}>{"Fecha: "}</Text>
                      <Text style={{}}>
                        {item.fechaPostFormato || "No definido"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => `${item.FilenameTitle}-${item.pdfPrincipal}`} // Provide a unique key for each item
      />
    </KeyboardAwareScrollView>
  );
}

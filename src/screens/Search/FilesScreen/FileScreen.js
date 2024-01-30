import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./FileScreen.styles";

import { useNavigation } from "@react-navigation/native";
import { getStorage, ref, deleteObject } from "firebase/storage";

import { screen } from "../../../utils";
import { connect } from "react-redux";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { db } from "../../../utils";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

function FileScreenBare(props) {
  const {
    route: {
      params: { Item },
    },
  } = props;

  const navigation = useNavigation();
  const userType = props.profile?.userType;

  const documents = Item.pdfFile?.filter((item) => {
    return typeof item !== "string";
  });

  const documentsUserType = documents?.filter((item) => {
    return (
      item.tipoFile !== "Cotizacion" ||
      userType === "Gerente" ||
      userType === "Planificador" ||
      userType === "GerenteContratista" ||
      userType === "PlanificadorContratista"
    );
  });

  const uploadFile = useCallback(async (uri) => {
    try {
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se puede abrir el documento PDF",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se puede abrir el documento PDF",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  }, []);

  const goToAddDocsForm = () => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.addDocs,
      // params: { Item: item },
    });
  };

  const deleteDoc = (item) => {
    Alert.alert(
      "Eliminar Documento",
      "Estas Seguro que desear Eliminar el Documento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: async () => {
            //updating events in ServiciosAIT to filter the deleted event
            const Ref = doc(db, "ServiciosAIT", Item?.idServiciosAIT);
            const docSnapshot = await getDoc(Ref);
            const eventList = docSnapshot.data().pdfFile;

            const filteredList = eventList.filter(
              (obj) => obj.pdfPrincipal !== item.pdfPrincipal
            );

            const updatedData = {
              pdfFile: filteredList,
            };

            await updateDoc(Ref, updatedData);

            //delete doc from storage
            const documentPath = `pdfPost/${item.FilenameTitle}-${item.fechaPostFormato}`;
            try {
              const storage = getStorage();
              const storageRef = ref(storage, documentPath);
              await deleteObject(storageRef);
            } catch (error) {
              console.error("Error deleting document:", error.message);
              // Handle errors as needed
            }

            //send success message
            Toast.show({
              type: "success",
              position: "bottom",
              text1: "Se ha eliminado correctamente",
            });
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
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
        data={documentsUserType}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => uploadFile(item.pdfPrincipal)}
              onLongPress={
                props.email === item.email ? () => deleteDoc(item) : null
              }
            >
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

const mapStateToProps = (reducers) => {
  return {
    email: reducers.profile.email,
    profile: reducers.profile.profile,

    // servicesData: reducers.home.servicesData,
    // totalEventServiceAITLIST: reducers.home.totalEventServiceAITLIST,
  };
};

export const FileScreen = connect(mapStateToProps, {})(FileScreenBare);

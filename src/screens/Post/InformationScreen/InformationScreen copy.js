import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@rneui/themed";
import { styles } from "./InformationScreen.styles";
import { screen } from "../../../utils";
import { ListData } from "../../../components/AddInformation/ListInformation";
import { map, filter } from "lodash";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../../../utils";
import { connect } from "react-redux";

function InformationScreen(props) {
  const [dataList, setDataList] = useState([]);
  const { navigation, route } = props;
  const [data, setData] = useState();
  const dataID = data?.numeroFaja + data?.numeroPolin + data?.posicion || "";
  const lastListData = dataList.slice(-1)[0];
  const lastListDataID =
    lastListData?.numeroFaja +
      lastListData?.numeroPolin +
      lastListData?.posicion || "";

  useEffect(() => {
    if (route.params) {
      setData(route.params.formData);
    }
  }, [route.params]);

  useEffect(() => {
    if (data) {
      if (dataID === lastListDataID) {
        alert("No se guardo, el polin ya esta registrado anteriormente");
        return;
      } else if (route.params.Index || route.params.Index === 0) {
        const newDataList = [...dataList];
        newDataList.splice(route.params.Index, 0, data);
        setDataList(newDataList);
      } else {
        setDataList((prevDataList) => [...prevDataList, data]);
      }
    }
  }, [data]);

  const goToInformation = () => {
    navigation.navigate(screen.addinformation.addInformation, {
      CopyBeltNumber: data || "",
    });
  };

  const goToEdit = (item, index) => {
    navigation.navigate(screen.addinformation.addInformation, {
      EditData: { ...item, Index: index },
    });
    const result = filter(dataList, (data, index) => data !== item);
    setDataList(result);
  };
  const goToDelete = (item) => {
    Alert.alert(
      "Eliminar Dato",
      "Estas Seguro de eliminar este dato?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            const result = filter(dataList, (data) => data !== item);
            setDataList(result);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const sendToFirebase = async (dataList) => {
    if (dataList.length == 0) return;
    try {
      const newData = { dataList: dataList };
      newData.id = uuid();
      newData.createdData = new Date().toISOString();

      await setDoc(doc(db, "Polines-Data", newData.id), newData);

      alert("Se han enviado los datos correctamente a la nube");
      navigation.navigate(screen.homestack.tab, {
        screen: screen.homestack.home,
        params: { data: newData },
      });

      setDataList([]);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {dataList && (
        <FlatList
          data={dataList}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.radioCard}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        // backgroundColor: "#FA4A0C", // Set the background color of the circle to orange
                        borderRadius: 15, // Set the border radius to half of the height to make it a circle
                        height: 20, // Set the height and width of the circle to your desired size
                        width: 20,
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: 12,
                        // color: "#384967",
                        opacity: 0.5,
                      }}
                    >
                      {index + 1}.
                    </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        // fontFamily: "DM Sans",
                        fontSize: 12,
                        // color: "#384967",
                        alignItems: "center",
                        opacity: 0.5,
                      }}
                    >
                      Fecha:
                    </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        // fontFamily: "DM Sans",
                        fontSize: 12,
                        // color: "#384967",
                        opacity: 0.5,
                      }}
                    >
                      {item.createdAt}
                      {"                                       "}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Icon
                      // reverse
                      type="material-community"
                      name="pencil-circle-outline"
                      color="#384967"
                      size={18}
                      // containerStyle={styles.btnContainer1}
                      onPress={() => goToEdit(item, index)}
                    />
                    <Text>{"  "} </Text>
                    <Icon
                      // reverse
                      type="material-community"
                      name="close-circle-outline"
                      color="#384967"
                      size={18}
                      // containerStyle={styles.btnContainer1}
                      onPress={() => goToDelete(item)}
                    />
                  </View>
                </View>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>NumeroFaja: </Text>
                    <Text>{item.numeroFaja} </Text>
                    <Text style={{ fontWeight: "bold" }}> Polin:</Text>
                    <Text>{item.numeroPolin}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold" }}> Posicion:</Text>
                      <Text> {item.posicion}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold" }}>Zona: </Text>
                      <Text>{item.zona}</Text>
                      <Text>{"           "} </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold" }}> Condicion: </Text>
                      <Text>{item.condicion}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Prioridad: </Text>
                    <Text>
                      {item.prioridad}
                      {"    "}
                    </Text>
                    <Icon
                      // reverse
                      type="material-community"
                      name="circle"
                      color={
                        item.prioridad === "1_Critico"
                          ? "red"
                          : item.prioridad === "3_Normal"
                          ? "green"
                          : "yellow"
                      }
                      size={18}
                      onPress={() => goToDelete(item)}
                    />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Observacion: </Text>
                    <Text style={{ flex: 1, textAlign: "justify" }}>
                      {item.observacion}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        // fontFamily: "DM Sans",
                        fontSize: 12,
                        fontStyle: "italic",
                        opacity: 0.5,
                      }}
                    >
                      Inspeccionado Por:
                    </Text>
                    <Text
                      style={{
                        // fontFamily: "DM Sans",
                        fontSize: 12,
                        fontStyle: "italic",
                        opacity: 0.5,
                      }}
                    >
                      {item.userEmail}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
      <View>
        <Icon
          reverse
          type="material-community"
          name="send-circle-outline"
          color="#FA4A0C"
          containerStyle={styles.btnContainer1}
          onPress={() => sendToFirebase(dataList)}
        />
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#FA4A0C"
          containerStyle={styles.btnContainer2}
          onPress={goToInformation}
        />
      </View>
    </>
  );
}

const mapStateToProps = (reducers) => {
  return reducers.post;
};

export const ConnectedInformationScreen = connect(mapStateToProps, {
  // savePhotoUri,
})(InformationScreen);

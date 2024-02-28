import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { styles } from "./ItemScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../utils";
import { screen } from "../../../utils";
import { connect } from "react-redux";
import { saveActualServiceAIT } from "../../../actions/post";
import { EquipmentListUpper } from "../../../actions/home";
import { areaLists } from "../../../utils/areaList";
import { CircularProgress } from "./CircularProgress";
import { GanttHistorial } from "../../../components/Search/Gantt/Gantt";
import Toast from "react-native-toast-message";

function ItemScreenNotRedux(props) {
  let AITServiceList;

  const [post, setPost] = useState(null);
  const [serviceInfo, setServiceInfo] = useState();

  //Retrieve data Item that comes from the previous screen to render the Updated Status
  const {
    route: {
      params: { Item },
    },
  } = props;
  const navigation = useNavigation();

  //Data about the company belong this event
  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  const regex = /@(.+?)\./i;

  ///the algoritm to retrieve the image source to render the icon
  const area = serviceInfo?.AreaServicio;
  const indexareaList = areaLists?.findIndex((item) => item.value === area);
  const imageSource = areaLists[indexareaList]?.image;
  /// the algorithm to retrieve the amount with format
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(serviceInfo?.Monto);

  ///function to change the format of FechaFin from ServiciosAIT firebase collection
  const formatDate = (item) => {
    if (!item) return;
    const date = new Date(item);

    const monthNames = [
      "ene.",
      "feb.",
      "mar.",
      "abr.",
      "may.",
      "jun.",
      "jul.",
      "ago.",
      "sep.",
      "oct.",
      "nov.",
      "dic.",
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };

  // Considering if there are a modification in the service
  const HHModificado = serviceInfo?.HHModificado ?? 0;
  const MontoModificado = serviceInfo?.MontoModificado ?? 0;
  const NuevaFechaEstimada = serviceInfo?.NuevaFechaEstimada ?? 0;

  const HHtoRender =
    HHModificado > serviceInfo?.HorasHombre
      ? HHModificado
      : serviceInfo?.HorasHombre;
  const MontoModificadotoRender =
    MontoModificado > serviceInfo?.Monto ? MontoModificado : serviceInfo?.Monto;
  const NuevaFechaEstimadatoRender =
    NuevaFechaEstimada > serviceInfo?.FechaFin
      ? formatDate(NuevaFechaEstimada?.seconds * 1000)
      : formatDate(serviceInfo?.FechaFin?.seconds * 1000);

  const NuevaFechaEstimadatoCalculate =
    NuevaFechaEstimada > serviceInfo?.FechaFin
      ? NuevaFechaEstimada?.seconds * 1000
      : serviceInfo?.FechaFin?.seconds * 1000;

  //calculate the amount of days to finish the service based if there are a new modification or not
  let daysLeft = (
    (NuevaFechaEstimadatoCalculate - Date.now()) /
    86400000
  ).toFixed(0);

  //Using navigation.navigate I send it to another screen (post)
  const goToPublicar = () => {
    if (!imageSource && !serviceInfo.photoServiceURL) {
      Toast.show({
        type: "error",
        text1: "Actualizar foto del servicio para continuar",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }

    navigation.goBack();

    navigation.navigate(screen.post.tab, {
      screen: screen.post.camera,
    });
  };

  useEffect(() => {
    const companyName =
      capitalizeFirstLetter(props.email?.match(regex)?.[1]) || "Anonimo";
    AITServiceList = props.servicesData;

    let service = AITServiceList.filter(
      (item) => item.idServiciosAIT === Item
    )[0];
    const lista = [];
    service?.events?.forEach((item) => {
      const dataschema = {
        ...item,
        time: "27 Ago",
        title: item.titulo,
        description: item.comentarios,
        lineColor: "skyblue",
        icon: require("../../../../assets/empresa.png"),
        imageUrl: item.fotoUsuarioPerfil,
        idDocAITFirestoreDB: Item,
      };
      lista.push(dataschema);
    });
    if (companyName !== "Fmi") {
      setPost(lista);
    } else {
      const filteredLista = lista.filter((item) => {
        return item.visibilidad === "Todos";
      });
      setPost(filteredLista);
    }
    setServiceInfo(service);
    props.saveActualServiceAIT(service);
  }, [props.servicesData]);

  //this function goes to another screen to get more detail about the service state
  const Detalles = (data) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.moreDetail,
      params: { Item: data },
    });
  };

  //this function goes to homeTab=>commentScreen
  const comentPost = (item) => {
    navigation.navigate(screen.home.tab, {
      screen: screen.home.comment,
      params: { Item: item },
    });
  };

  //this function goes to homeTab=>commentScreen
  const goToDocsToApprove = (item) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.approve,
      params: { Item: item },
    });
  };

  //Using navigation.navigate I send it to another screen (post)
  const goToDocs = (item) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.pdf,
      params: { Item: item },
    });
  };

  ///////////////////// serviceInfo
  if (!serviceInfo || !post) {
    return;
  } else {
    return (
      <>
        <ScrollView
          style={{ backgroundColor: "white" }} // Add backgroundColor here
          showsVerticalScrollIndicator={false}
        >
          <Text></Text>

          <View style={[styles.row, styles.center]}>
            <View>
              <CircularProgress
                imageSourceDefault={imageSource}
                imageStyle={styles.roundImage}
                avance={serviceInfo.AvanceEjecucion}
                id={serviceInfo.idServiciosAIT}
                image={serviceInfo.photoServiceURL}
                titulo={serviceInfo.NombreServicio}
              />
            </View>
            <Text> </Text>
            <View style={{ marginLeft: 0 }}>
              <Text style={styles.name}>{serviceInfo.NombreServicio}</Text>
              <Text style={styles.info}>
                {"Numero Serv:  "} {serviceInfo.NumeroAIT}
              </Text>
              <Text style={styles.info}>
                {"Tipo:  "} {serviceInfo.TipoServicio}
              </Text>
              <Text style={styles.info}>
                {"Fecha Inicio:  "}{" "}
                {formatDate(serviceInfo?.FechaInicio?.seconds * 1000) ||
                  formatDate(serviceInfo?.createdAt?.seconds * 1000)}
              </Text>
              <Text style={styles.info}>
                {"Fecha Fin:  "} {NuevaFechaEstimadatoRender}
              </Text>
              <Text style={styles.info}>
                {"Ejecucion:  "} {serviceInfo.AvanceEjecucion}
                {" %"}
              </Text>
              {serviceInfo.AvanceEjecucion === "100" ? (
                <Text style={styles.alert2}>
                  {"Estado:  "}
                  {" Finalizado"}
                </Text>
              ) : daysLeft < 0 ? (
                <Text style={styles.alert1}>
                  {"Dias de Retraso:  "} {-daysLeft}
                  {" dias"}
                </Text>
              ) : (
                <Text style={styles.alert2}>
                  {"Dias Restantes:  "} {daysLeft}
                  {" dias"}
                </Text>
              )}
            </View>
          </View>
          <Text></Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.btnContainer4}
              onPress={() => Detalles(serviceInfo)}
            >
              <Image
                source={require("../../../../assets/more_information.png")}
                style={styles.roundImageUpload}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnContainer4}
              onPress={() => goToDocs(serviceInfo)}
            >
              <Image
                source={require("../../../../assets/docsIcon.png")}
                style={styles.roundImageUpload}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnContainer4}
              onPress={() => goToPublicar()}
            >
              <Image
                source={require("../../../../assets/TakePhoto2.png")}
                style={styles.roundImageUpload}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnContainer4}
              onPress={() => goToDocsToApprove(serviceInfo)}
            >
              <Image
                source={require("../../../../assets/approved.png")}
                style={styles.roundImageUpload}
              />
            </TouchableOpacity>
          </View>
          <Text></Text>
          <Text></Text>

          <Text
            style={{
              marginLeft: 15,
              borderRadius: 5,
              fontWeight: "700",
              alignSelf: "center",
            }}
          >
            Historial de Eventos
          </Text>
          <Text></Text>

          <GanttHistorial datas={post} comentPost={comentPost} />
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = (reducers) => {
  return {
    servicesData: reducers.home.servicesData,
    email: reducers.profile.email,

    // servicesData: reducers.home.servicesData,
    // totalEventServiceAITLIST: reducers.home.totalEventServiceAITLIST,
  };
};

export const ItemScreen = connect(mapStateToProps, {
  saveActualServiceAIT,
  EquipmentListUpper,
})(ItemScreenNotRedux);

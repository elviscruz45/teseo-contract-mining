import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import { styles } from "./ItemScreen.styles";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";
import { equipmentList } from "../../../utils/equipmentList";
import { db } from "../../../utils";
import { screen } from "../../../utils";
import { getExcelEquipo } from "../../../utils/excelData";
import { connect } from "react-redux";
import { saveActualServiceAIT } from "../../../actions/post";
import { EquipmentListUpper } from "../../../actions/home";
import { DateScreen } from "../../../components/Post/DateScreen/DateScreen";
import { areaLists } from "../../../utils/areaList";
import { CircularProgress } from "./CircularProgress";
import { GanttHistorial } from "../../../components/Search/Gantt/Gantt";

function ItemScreenNotRedux(props) {
  console.log("22.itemScreen");
  const [post, setPost] = useState(null);
  const [serviceInfo, setServiceInfo] = useState();
  console.log("InfoService++++++++++", serviceInfo);

  //Retrieve data Item that comes from the previous screen to render the Updated Status
  const {
    route: {
      params: { Item },
    },
  } = props;

  const navigation = useNavigation();
  //calculate the amount of days to finish the service
  let daysLeft = (
    (serviceInfo?.FechaFin.seconds * 1000 - Date.now()) /
    86400000
  ).toFixed(0);
  ///the algoritm to retrieve the image source to render the icon
  const area = serviceInfo?.AreaServicio;
  const indexareaList = areaLists?.findIndex((item) => item.value === area);
  const imageSource = areaLists[indexareaList]?.image;
  console.log("itemScreen....", imageSource);
  /// the algorithm to retrieve the amount with format
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(serviceInfo?.Monto);
  ///algoritm to change the format of FechaFin from ServiciosAIT firebase collection
  const date = new Date(serviceInfo?.FechaFin?.seconds * 1000);
  console.log(date);
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

  ///algoritm to change the format of FechaInicio from ServiciosAIT firebase collection
  const dateInicio = new Date(serviceInfo?.createdAt?.seconds * 1000);
  const monthNamesInicio = [
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
  const dayInicio = dateInicio.getDate();
  const monthInicio = monthNamesInicio[dateInicio.getMonth()];
  const yearInicio = dateInicio.getFullYear();
  const formattedDateInicio = `${dayInicio} ${monthInicio} ${yearInicio}`;

  //Using navigation.navigate I send it to another screen (post)
  const goToPublicar = () => {
    navigation.goBack();

    navigation.navigate(screen.post.tab, {
      screen: screen.post.camera,
    });
  };

  //Using navigation.navigate I send it to another screen (post)
  const goToPdf = (item) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.pdf,
      params: { Item: item },
    });
  };

  useEffect(() => {
    let unsubscribe;
    async function fetchData() {
      let queryRef = query(
        collection(db, "ServiciosAIT"),
        orderBy("createdAt", "desc"),
        where("idServiciosAIT", "==", Item),
        where("companyName", "==", "prodise")
      );

      unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
        const lista = [];
        const InfoService = [];
        ItemFirebase.forEach((doc) => {
          InfoService.push(doc.data());
        });
        console.log("InfoService", InfoService);
        ItemFirebase.forEach((doc) => {
          doc.data().events.forEach((item) => {
            const dataschema = {
              ...item,
              time: "27 Ago",
              title: item.titulo,
              description: item.comentarios,
              lineColor: "skyblue",
              icon: require("../../../../assets/empresa.png"),
              imageUrl: item.fotoUsuarioPerfil,
            };
            lista.push(dataschema);
          });
        });
        // console.log("999.OnSnapshot_Servicios_AITEVENTS_SCREEN", lista);
        setPost(lista);
        setServiceInfo(InfoService[0]);
      });
    }
    fetchData();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [Item]);
  // }, [Item, props.servicesData]);

  // //This hook used to retrieve post data from Firebase and sorted by date
  // useEffect(() => {
  //   let InfoService = props.servicesData.filter((item) => {
  //     return item.idServiciosAIT === Item.idServiciosAIT;
  //   });
  //   setServiceInfo(InfoService[0]);
  // }, [props.servicesData, Item]);

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
              <Text></Text>
              <CircularProgress
                imageSourceDefault={imageSource}
                imageStyle={styles.roundImage}
                avance={serviceInfo.AvanceEjecucion}
                id={serviceInfo.idServiciosAIT}
                image={serviceInfo.photoServiceURL}
                titulo={serviceInfo.NombreServicio}
              />

              <Text></Text>
            </View>
            <Text> </Text>
            <View>
              <Text style={styles.name}>{serviceInfo.NombreServicio}</Text>
              <Text style={styles.info}>
                {"Numero Serv:  "} {serviceInfo.NumeroAIT}
              </Text>
              <Text style={styles.info}>
                {"Tipo:  "} {serviceInfo.TipoServicio}
              </Text>
              <Text style={styles.info}>
                {"Fecha Inicio:  "} {formattedDateInicio}
              </Text>
              <Text style={styles.info}>
                {"Fecha Fin:  "} {formattedDate}
              </Text>
              <Text style={styles.info}>
                {"Ejecucion:  "} {serviceInfo.AvanceEjecucion}
                {" %"}
              </Text>
              {daysLeft < 0 ? (
                <Text style={styles.alert1}>
                  {"Dias de Retraso:  "} {daysLeft}
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
              onPress={() => goToPdf(serviceInfo)}
            >
              <Image
                source={require("../../../../assets/pdf4.png")}
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

          <GanttHistorial datas={post} comentPost={comentPost} />
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = (reducers) => {
  return {
    // servicesData: reducers.home.servicesData,
    // totalEventServiceAITLIST: reducers.home.totalEventServiceAITLIST,
  };
};

export const ItemScreen = connect(mapStateToProps, {
  saveActualServiceAIT,
  EquipmentListUpper,
})(ItemScreenNotRedux);

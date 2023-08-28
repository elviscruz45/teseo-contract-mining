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
  const [isLoading, setIsLoading] = useState(true);
  const [firestoreEquipmentLiked, setFirestoreEquipmentLiked] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [removeFilter, setRemoveFilter] = useState(true);
  const [allData, setAllData] = useState();

  console.log("allData", allData);

  //Retrieve data Item that comes from the previous screen to render the Updated Status
  const {
    route: {
      params: { Item },
    },
  } = props;
  const navigation = useNavigation();
  //calculate the amount of days to finish the service
  let daysLeft = (
    (Item.FechaFin.seconds * 1000 - Date.now()) /
    86400000
  ).toFixed(0);
  ///the algoritm to retrieve the image source to render the icon
  const area = Item.AreaServicio;
  const indexareaList = areaLists.findIndex((item) => item.value === area);
  const imageSource = areaLists[indexareaList]?.image;
  console.log("itemScreen....", imageSource);
  /// the algorithm to retrieve the amount with format
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Item.Monto);
  ///algoritm to change the format of FechaFin from ServiciosAIT firebase collection
  const date = new Date(Item?.FechaFin?.seconds * 1000);
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
  const dateInicio = new Date(Item?.createdAt?.seconds * 1000);
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

  //Changing the value to activate again the filter to rende the posts
  const filter = (start, end) => {
    console.log("filter");
    setStartDate(start);
    setEndDate(end);
  };
  const quitfilter = () => {
    setRemoveFilter((prev) => !prev);
    setStartDate(null);
    setEndDate(null);
    console.log("removeFilter");
  };

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

  // const arraytoCompareinFirebase = ["RyVnEJx2hjsSiJeILqrv"];

  // const [allData, setAllData] = useState();
  useEffect(() => {
    let unsubscribe;
    async function fetchData() {
      let queryRef = query(
        collection(db, "events"),
        // orderBy("idDocFirestoreDB"), // Add this line
        orderBy("createdAt", "desc"),
        where("AITNombreServicio", "==", Item.NombreServicio)
        // where("idDocFirestoreDB", "not-in", arraytoCompareinFirebase)
      );
      unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
        const lista = [];
        ItemFirebase.forEach((doc) => {
          const dataschema = {
            ...doc.data(),
            time: "27 Ago",
            title: doc.data().titulo,
            description: doc.data().comentarios,
            lineColor: "skyblue",
            icon: require("../../../../assets/empresa.png"),
            imageUrl: doc.data().fotoUsuarioPerfil,
          };
          lista.push(dataschema);
        });
        console.log("1.OnSnapshoITEMSCREEN_EVENTS", lista);
        setAllData(lista);
      });
    }
    fetchData();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  //This hook used to retrieve post data from Firebase and sorted by date
  useEffect(() => {
    if (allData) {
      console.log("UseEffectitemScreen");
      setPost(allData);
    }
  }, [allData]);

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
  const goToDocsToApprove = () => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.approve,
      params: { Item: Item },
    });
  };
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
      >
        <Text></Text>

        <View style={[styles.row, styles.center]}>
          <View>
            <Text></Text>
            <CircularProgress
              imageSourceDefault={imageSource}
              imageStyle={styles.roundImage}
              avance={Item.AvanceEjecucion}
              id={Item.idServiciosAIT}
              image={Item.photoServiceURL}
              titulo={Item.NombreServicio}
            />

            <Text></Text>
          </View>
          <View>
            <Text style={styles.name}>{Item.NombreServicio}</Text>
            <Text style={styles.info}>
              {"Numero Serv:  "} {Item.NumeroAIT}
            </Text>
            <Text style={styles.info}>
              {"Tipo:  "} {Item.TipoServicio}
            </Text>
            <Text style={styles.info}>
              {"Fecha Inicio:  "} {formattedDateInicio}
            </Text>
            <Text style={styles.info}>
              {"Fecha Fin:  "} {formattedDate}
            </Text>
            <Text style={styles.info}>
              {"Ejecucion:  "} {Item.AvanceEjecucion}
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
            onPress={() => Detalles(Item)}
          >
            <Image
              source={require("../../../../assets/more_information.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnContainer4}
            onPress={() => goToPdf(Item)}
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
            onPress={() => goToDocsToApprove()}
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

const mapStateToProps = (reducers) => {
  return {
    totalEventServiceAITLIST: reducers.home.totalEventServiceAITLIST,
  };
};

export const ItemScreen = connect(mapStateToProps, {
  saveActualServiceAIT,
  EquipmentListUpper,
})(ItemScreenNotRedux);

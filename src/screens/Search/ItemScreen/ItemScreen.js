import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
  Linking,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./ItemScreen.styles";
import { SearchBar, Icon, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ItemScreenNotRedux(props) {
  console.log("itemScreen");
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firestoreEquipmentLiked, setFirestoreEquipmentLiked] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [removeFilter, setRemoveFilter] = useState(true);

  //Retrieve data Item that comes from the previous screen to render the Updated Status
  const {
    route: {
      params: { Item },
    },
  } = props;
  const navigation = useNavigation();

  ///the algoritm to retrieve the image source to render the icon
  const area = Item.AreaServicio;
  const indexareaList = areaLists.findIndex((item) => item.value === area);
  const imageSource = areaLists[indexareaList]?.image;
  /// the algorithm to retrieve the amount with format
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Item.Monto);
  ///algoritm to change the format of FechaFin from ServiciosAIT firebase collection
  const date = new Date(Item.FechaFin.seconds * 1000);
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
  const dateInicio = new Date(Item.createdAt.seconds * 1000);
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
    props.saveActualServiceAIT(Item);

    navigation.navigate(screen.post.tab, {
      screen: screen.post.camera,
      // params: { Item: Item },
    });
  };

  //This function is used to retrive the image file to the icon
  function chooseImageEquipment(tags) {
    const result = equipmentList.find((item) => {
      return item.tag == tags;
    });
    return result.image;
  }

  //This hook used to retrieve post data from Firebase and sorted by date
  useEffect(() => {
    console.log("UseEffectitemScreen");

    let unsubscribe;
    let q;
    async function fetchData() {
      if (startDate && endDate) {
        q = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          where("equipoTag", "==", Item.tag),
          where("createdAt", ">=", startDate),
          where("createdAt", "<=", endDate)
        );
      } else {
        console.log("removeFilter");
        q = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          where("equipoTag", "==", Item.tag),
          limit(50) // Add the desired limit value here
        );
      }
      try {
        const querySnapshot = await getDocs(q);
        const lista = [];
        querySnapshot.forEach((doc) => {
          lista.push(doc.data());
        });
        console.log("getDocs Item with date");

        setPost(lista);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      // Unsubscribe from the previous listener when the component is unmounted or when the dependencies change
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [startDate, endDate, removeFilter, Item]);

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

  //This is used to get the attached file in the post that contain an attached file
  async function UploadFile(uri) {
    Linking.canOpenURL(uri)
      .then((supported) => {
        if (supported) {
          Linking.openURL(uri);
        } else {
          alert("Unable to open PDF document");
        }
      })
      .catch((error) => alert("Error opening PDF document", error));
  }

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <Text></Text>

      <View style={[styles.row, styles.center]}>
        <View>
          <Text></Text>
          <CircularProgress
            imageSource={imageSource}
            imageStyle={styles.roundImage}
            avance={Item.AvanceEjecucion}
          />

          <Text></Text>
        </View>
        <View>
          {console.log(Item)}
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
        </View>
      </View>
      <Text></Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "space-between",

          // paddingHorizontal: 150,
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
          onPress={() => goToPublicar()}
        >
          <Image
            source={require("../../../../assets/TakePhoto2.png")}
            style={styles.roundImageUpload}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer4}
          onPress={() => getExcelEquipo(Item.tag)}
        >
          <Image
            source={require("../../../../assets/excel2.png")}
            style={styles.roundImageUpload}
          />
        </TouchableOpacity>
      </View>
      <Text></Text>

      <DateScreen filterButton={filter} quitFilterButton={() => quitfilter()} />

      <FlatList
        data={post}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => comentPost(item)}>
              <View />
              <View>
                <View style={styles.equipments2}>
                  <ImageExpo
                    source={{ uri: item.fotoPrincipal }}
                    style={styles.image2}
                    cachePolicy={"memory-disk"}
                  />
                  <View>
                    <Text style={styles.name2}>{item.titulo}</Text>
                    <Text style={styles.info2}>{item.comentarios}</Text>
                    <Text style={styles.info2}>{item.fechaPostFormato}</Text>
                  </View>
                  {item.pdfPrincipal && (
                    <TouchableOpacity
                      onPress={() => UploadFile(item.pdfPrincipal)}
                      style={styles.attachedElement}
                    >
                      <Icon type="material-community" name="paperclip" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.fotoPrincipal} // Provide a unique key for each item
      />
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (reducers) => {
  return {
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    savePhotoUri: reducers.post.savePhotoUri,
    actualEquipment: reducers.post.actualEquipment,
    uid: reducers.profile.uid,
    equipmentListHeader: reducers.home.equipmentList,
  };
};

export const ItemScreen = connect(mapStateToProps, {
  saveActualServiceAIT,
  EquipmentListUpper,
})(ItemScreenNotRedux);

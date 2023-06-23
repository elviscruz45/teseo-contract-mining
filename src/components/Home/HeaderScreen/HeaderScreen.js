import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, where } from "firebase/firestore";
import { Image as ImageExpo } from "expo-image";
import { equipmentList } from "../../../utils/equipmentList";
import { styles } from "./HeaderScreen.styles";
import { connect } from "react-redux";
import { db } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { EquipmentListUpper } from "../../../actions/home";
import { screen } from "../../../utils";

function HeaderScreenNoRedux(props) {
  const navigation = useNavigation();
  const [postsHeader, setPostsHeader] = useState(equipmentList);

  const selectAsset = (item) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: item },
    });
  };
  // // Retrieve data from equipment list to the header list and to render all the post
  useEffect(() => {
    let q = query(collection(db, "users"), where("uid", "==", props.uid));

    if (props?.equipmentListHeader?.length > 0) {
      const filteredList = equipmentList.filter((equipment) =>
        props.equipmentListHeader?.includes(equipment.tag)
      );
      setPostsHeader(filteredList);
    } else {
      setPostsHeader(equipmentList);
    }
  }, [props?.equipmentListHeader?.toString()]);

  return (
    <View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={postsHeader}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => selectAsset(item)}>
              <View style={styles.textImage}>
                <ImageExpo
                  source={item.image}
                  style={styles.roundImage5}
                  cachePolicy={"memory-disk"}
                />

                <Text style={styles.Texticons}>{item.tag}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.tag} // Provide a unique key for each item
      />
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return {
    ActualPostFirebase: reducers.post.ActualPostFirebase,
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    profile: reducers.profile.profile,
    uid: reducers.profile.uid,
    equipmentListHeader: reducers.home.equipmentList,
  };
};

export const HeaderScreen = connect(mapStateToProps, { EquipmentListUpper })(
  HeaderScreenNoRedux
);

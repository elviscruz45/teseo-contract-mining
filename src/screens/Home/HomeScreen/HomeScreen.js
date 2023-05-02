import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "@rneui/themed";
import { styles } from "./HomeScreen.styles";
import { equipmentList } from "../../../utils/equipmentList";

// source={require("../../../../assets/StatisticsGraphic.png")}
// Icono;

function HomeScreen() {
  return (
    <>
      <Text></Text>

      <View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={equipmentList}
          renderItem={({ item }) => (
            <View style={styles.textImage}>
              <Image source={item.image} style={styles.roundImage5} />
              <Text style={styles.Texticons}>{item.tag}</Text>
            </View>
          )}
        />
      </View>
      <Text></Text>
      <FlatList
        data={"12345678"}
        renderItem={({ item }) => (
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: "#E35622",
              margin: 2,
            }}
          >
            <View style={[styles.row, styles.center]}>
              <View style={[styles.row, styles.center]}>
                <Image
                  source={require("../../../../assets/CHI.jpeg")}
                  style={styles.roundImage}
                />
                <Text>C2-CR001</Text>
                <Image
                  source={require("../../../../assets/Elvis_Cruz_Formal.jpg")}
                  style={styles.roundImage}
                />
                <Text>Elvis Ronald Cruz Chullo</Text>
              </View>
            </View>
            <View style={[styles.row, styles.center]}>
              <Text style={{ margin: 5, color: "#5B5B5B" }}>
                {"Fecha:15 Agosto 2023 14:22 Hr.  "}
              </Text>
              <Text style={{ margin: 5, color: "black" }}>
                {"2 photos more ...  "}
              </Text>
            </View>
            <View style={styles.equipments}>
              <Image
                source={require("../../../../assets/img1.jpeg")}
                style={styles.postPhoto}
              />
              <View>
                <Text style={styles.textAreaTitle}>
                  {"Cambio de MainShaft"}
                </Text>
                <Text style={styles.textAreaComment}>
                  {
                    "Hola como estas, yo estoy muy bien Hola como estassssqqerqtrqerw, yo estoy muy bien Hola como estas, yo estoy muy bien Hola como estas, yo estoy muy bien Hola como estas, yo estoy muy bien Hola como estas, yo estoy muy bien"
                  }
                </Text>
              </View>
            </View>
            <View style={styles.rowlikes}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 210,
                }}
              >
                <TouchableOpacity>
                  <Icon type="material-community" name="thumb-up-outline" />
                </TouchableOpacity>
                <Text> 15 likes</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <Icon
                    type="material-community"
                    name="comment-processing-outline"
                  />
                </TouchableOpacity>
                <Text> 15 Comments</Text>
              </View>
            </View>
          </View>
        )}
      />
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    // count: reducers.reducer1.count,
    // user_login: reducers.user.user_login,
    // upload_post: reducers.post.description,
    // bio: reducers.user.bio,
    // user_photo: reducers.user.user_photo,
    // email: reducers.user.email,
    // uid: reducers.user.uid,
    // post_list: reducers.post.post_list,
    // equipment_photo: reducers.user.equipment_photo,
    // equipmentname: reducers.user.equipmentname,
  };
};

export const ConnectedHomeScreen = connect(mapStateToProps, {
  // add1,
  // subtract1,
  // logout,
  // post,
  // uploadPost,
  // getPosts,
  // likePost,
  // unlikePost,
  // actualCommentId,
  // actualPostDescription,
})(HomeScreen);

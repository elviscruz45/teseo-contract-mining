import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./Gantt.styles";

export const GanttHistorial = (props) => {
  const [selected, setSelected] = useState(null);
  const { datas, comentPost } = props;

  // const onEventPress = (data) => {
  //   setSelected(data);
  //   console.log(data);
  //   comentPost(data)
  // };

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        // style={[styles.listview, props.listViewStyle]}
        contentContainerStyle={props.listViewContainerStyle}
        data={datas}
        // extraData={data}
        renderItem={({ item, index }) => {
          return (
            <>
              <Text></Text>
              <View style={[styles.rowContainer]}>
                <View style={styles.timeWrapper}>
                  <View
                    style={[styles.timeContainer, styles.timeContainerStyle]}
                  >
                    <Text
                      style={[styles.time, styles.timeStyle]}
                      allowFontScaling={true}
                    >
                      {item.time}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.circle]}>
                <ImageExpo
                  source={item.icon}
                  style={{ width: 20, height: 20 }}
                  cachePolicy={"memory-disk"}
                />
              </View>
              <View style={styles.details}>
                <TouchableOpacity onPress={() => console.log("hola")}>
                  <Text style={styles.titledetails}> {item.title}</Text>
                  <View style={styles.row}>
                    <ImageExpo
                      source={{ uri: item.imageUrl }}
                      cachePolicy={"memory-disk"}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginLeft: 5,
                      }}
                    />
                    <Text style={styles.textdetail}> {item.description}</Text>
                  </View>
                  <Text></Text>
                  <View style={styles.rowavanceNombre}>
                    <Text style={styles.avanceNombre}> Avance Ejecucion: </Text>

                    <Text style={styles.detail}> {item.porcentajeAvance}%</Text>
                  </View>
                  <View style={styles.rowavanceNombre}>
                    <Text style={styles.avanceNombre}> Autor: </Text>

                    <Text style={styles.detail}> {item.nombrePerfil}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
        // keyExtractor={(item, index) => index + ""}
        {...props.options}
      />
    </View>
  );
};

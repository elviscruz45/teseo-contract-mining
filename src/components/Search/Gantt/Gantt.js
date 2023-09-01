import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./Gantt.styles";
import { Icon } from "@rneui/themed";

export const GanttHistorial = (props) => {
  const { datas, comentPost } = props;
  const dataSorted = datas?.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={props.listViewContainerStyle}
        data={dataSorted}
        renderItem={({ item, index }) => {
          const timestampData = item.createdAt;
          const timestampInMilliseconds =
            timestampData.seconds * 1000 + timestampData.nanoseconds / 1000000;
          const date = new Date(timestampInMilliseconds); // Function to get the abbreviated month name
          function getAbbreviatedMonthName(monthNumber) {
            const months = [
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Set",
              "Oct",
              "Nov",
              "Dic",
            ];
            return months[monthNumber];
          }
          // Create the formatted string "dd MMM" (e.g., "28 Ago")
          const day = date.getDate();
          const month = getAbbreviatedMonthName(date.getMonth());
          const formattedDate = `${day} ${month}`;

          //get the company name from the userEmail
          const regex = /@([a-z]+)\.com/i;
          const matches = item.emailPerfil.match(regex);

          return (
            <View style={{ margin: 10 }}>
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
                      {formattedDate}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.circle]}>
                {matches[1] === "fmi" ? (
                  <ImageExpo
                    source={require("../../../../assets/smcv2.jpeg")}
                    style={{ width: 20, height: 20 }}
                    cachePolicy={"memory-disk"}
                  />
                ) : (
                  <ImageExpo
                    source={item.icon}
                    style={{ width: 20, height: 20 }}
                    cachePolicy={"memory-disk"}
                  />
                )}
              </View>
              <View style={styles.details}>
                <TouchableOpacity onPress={() => comentPost(item)}>
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
                    <Text style={styles.avanceNombre}> Etapa: </Text>

                    <Text style={styles.detail}> {item.etapa}</Text>
                  </View>
                  <View style={styles.rowavanceNombre}>
                    <Text style={styles.avanceNombre}> Avance Ejecucion: </Text>

                    <Text style={styles.detail}> {item.porcentajeAvance}%</Text>
                  </View>
                  <View style={styles.rowavanceNombre}>
                    <Text style={styles.avanceNombre}> Autor: </Text>
                    <Text style={styles.detail}> {item.nombrePerfil}</Text>
                  </View>
                  {item?.pdfFile && (
                    <View style={styles.rowavanceNombre}>
                      <Icon type="material-community" name="paperclip" />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.createdAt}
      />
    </View>
  );
};

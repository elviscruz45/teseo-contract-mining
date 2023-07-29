import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

export const ServiceList = (props) => {
  const { data } = props;

  const tableData = [
    {
      id: 1,
      name: "sdfsdf ",
    },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    // Add more items as needed
  ];
  // const tableData = [
  //   {
  //     id: 1,
  //     name: "sdfsdf ",
  //     price: "$10.99",
  //   },
  //   { id: 2, name: "Item 2", price: "$24.99" },
  //   { id: 3, name: "Item 3", price: "$7.49" },
  //   // Add more items as needed
  // ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DataTable>
        {/* Table header */}
        <DataTable.Header>
          <DataTable.Title style={styles.shortColumn1}>ID</DataTable.Title>
          <DataTable.Title style={styles.multiLineColumn}>
            Nombre
          </DataTable.Title>
          <DataTable.Title style={styles.shortColumn2}>Avance</DataTable.Title>
          <DataTable.Title style={styles.column4}>Fecha Fin</DataTable.Title>
        </DataTable.Header>

        {/* Table data */}
        {tableData.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell style={styles.shortColumn1}>
              {item.id}
            </DataTable.Cell>
            <DataTable.Cell
              style={styles.multiLineColumn}
              // numberOfLines={2}
            >
              {item.name}
            </DataTable.Cell>
            <DataTable.Cell style={styles.shortColumn2}>
              {item.price}
            </DataTable.Cell>
            <DataTable.Cell style={styles.column}>{item.price}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  column: {
    flex: 1,
  },
  column4: {
    flex: 1,
  },
  shortColumn1: {
    flex: 0.77, // Adjust the value as per your requirement for the width
    maxWidth: 200, // Adjust the maxWidth as per your requirement
  },
  shortColumn2: {
    flex: 1, // Adjust the value as per your requirement for the width
  },
  shortColumn3: {
    flex: 0.4, // Adjust the value as per your requirement for the width
  },
  multiLineColumn: {
    flex: 2,
  },
});

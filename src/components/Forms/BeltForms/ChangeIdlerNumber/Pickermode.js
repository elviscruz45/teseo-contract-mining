// import { View, Text, Platform } from "react-native";
// import React, { useState, useRef } from "react";
// import { Input, Button } from "@rneui/themed";
// // import { Picker } from "@react-native-picker/picker";
// import { styles } from "./Pickermode.styles";

// export function Pickermode(props) {
//   const { formik2, formik } = props;
//   // const pickerRef = useRef();
//   // const [selectedNumber1, setSelectedNumber1] = useState("");
//   // const [selectedNumber2, setSelectedNumber2] = useState("20");

//   // function open() {
//   //   pickerRef.current.focus();
//   // }

//   // function close() {
//   //   pickerRef.current.blur();
//   // }

//   // function saveNumber1property(itemValue) {
//   //   setSelectedNumber1(itemValue);
//   //   formik2.setFieldValue("Number1", itemValue);
//   // }
//   // function saveNumber2property(itemValue) {
//   //   setSelectedNumber2(itemValue);
//   //   formik2.setFieldValue("Number2", itemValue);
//   // }

//   function handlinginput(item) {}

//   return (
//     <>
//       <Text style={styles.text}>
//         {"Numero de Polin: "}
//         {/* {selectedNumber1}
//         {selectedNumber2} */}
//       </Text>
//       <View style={styles.content}>
//         {/* <Picker
//           selectedValue={selectedNumber1}
//           onValueChange={(itemValue, itemIndex) =>
//             saveNumber1property(itemValue)
//           }
//         >
//           {Array.from(Array(100).keys()).map((number) => (
//             <Picker.Item
//               key={number}
//               label={String(number)}
//               value={String(number)}
//             />
//           ))}
//         </Picker> */}
//         <Input
//           placeholder="Numero de Polin"
//           // editable={true}
//           keyboardType="numeric"
//           // onChangeText={() =>
//           //   formik.setFieldValue("numeroPolin", defaultValuePriority)
//           // }
//           errorMessage={formik.errors.prioridad}
//           rightIcon={{
//             type: "material-community",
//             name: "priority-high",
//             // color: getColorIconMap(formik),
//             onPress: () => selectComponent("prioridad"),
//           }}
//         />

//         {/*
//         <Picker
//           selectedValue={selectedNumber2}
//           onValueChange={(itemValue, itemIndex) =>
//             saveNumber2property(itemValue)
//           }
//         >
//           {Array.from(Array(100).keys()).map((number) => (
//             <Picker.Item
//               key={number}
//               label={String(number)}
//               value={String(number)}
//             />
//           ))}
//         </Picker> */}
//       </View>
//     </>
//   );
// }

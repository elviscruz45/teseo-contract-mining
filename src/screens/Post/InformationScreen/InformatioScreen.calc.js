import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../utils";

import { useEffect } from "react";
import Toast from "react-native-toast-message";

export const useUserData = (email, saveTotalUsers) => {
  useEffect(() => {
    // Function to fetch data from Firestore
    if (email) {
      const companyName = email?.match(/@(.+?)\./i)?.[1] || "Anonimo";

      async function fetchData() {
        try {
          const queryRef1 = query(
            collection(db, "users"),
            where("companyName", "==", "fmi"),
            orderBy("email", "desc")
          );

          const queryRef2 = query(
            collection(db, "users"),
            where("companyName", "==", companyName),
            orderBy("email", "desc")
          );

          const getDocs1 = await getDocs(queryRef1);
          const getDocs2 =
            companyName !== "fmi" ? await getDocs(queryRef2) : null;

          const lista = [];

          // Process results from the first query
          if (getDocs1) {
            getDocs1.forEach((doc) => {
              lista.push(doc.data());
            });
          }

          // Process results from the second query
          if (getDocs2) {
            getDocs2.forEach((doc) => {
              lista.push(doc.data());
            });
          }
          // Save the merged results to the state or do any other necessary operations
          saveTotalUsers(lista);
        } catch (error) {
          // console.error("Error fetching data:", error);
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Error al cargar los datos",
          });
          // Handle the error as needed
        }
      }
      // Call the fetchData function when the component mounts

      fetchData();
    }
  }, [email]);
};

export const dateFormat = () => {
  const date = new Date();

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
  const formattedDate = `${day} ${month} ${year}  ${hour}:${minute} Hrs`;
  return formattedDate;
};

export const uploadImage = async (uri) => {
  const uuid = uuidv4();

  const response = await fetch(uri);
  const blob = await response.blob();

  const storage = getStorage();
  const storageRef = ref(storage, `mainImageEvents/${uuid}`);
  return uploadBytes(storageRef, blob);
};

export const uploadPdf = async (uri) => {
  const uuid = uuidv4();
  const response = await fetch(uri);
  const blob = await response.blob();
  const fileSize = blob.size;

  try {
    if (fileSize > 25 * 1024 * 1024) {
      throw new Error("El archivo excede los 25 MB");
    }
    const storage = getStorage();

    const storageRef = ref(storage, `pdfPost/${uuid}`);

    return uploadBytes(storageRef, blob);
  } catch (error) {
    Toast.show({
      type: "error",
      position: "bottom",
      text1: "El archivo excede los 25 MB",
    });
  }
};

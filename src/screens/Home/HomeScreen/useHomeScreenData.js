// useHomeScreenData.js
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  limit,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";

export const useHomeScreenData = (
  email,
  saveTotalEventServiceAITList,
  saveApprovalListnew
) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");

  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  const regex = /@(.+?)\./i;

  useEffect(() => {
    let unsubscribe;

    if (email) {
      const companyName =
        capitalizeFirstLetter(email?.match(regex)?.[1]) || "Anonimo";

      async function fetchData() {
        let queryRef;
        if (companyName === "Fmi") {
          queryRef = query(
            collection(db, "events"),
            limit(10),
            where("visibilidad", "==", "Todos"),
            orderBy("createdAt", "desc")
          );
        } else {
          queryRef = query(
            collection(db, "events"),
            limit(10),
            where("AITcompanyName", "==", companyName),
            orderBy("createdAt", "desc")
          );
        }
        unsubscribe = onSnapshot(queryRef, async (ItemFirebase) => {
          const lista = [];
          ItemFirebase.forEach((doc) => {
            lista.push(doc.data());
          });
          //order the list by date
          lista.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });

          setPosts(lista);
          setCompanyName(companyName);
          saveTotalEventServiceAITList(lista);
          // console.log("events");
        });
        setIsLoading(false);
      }

      fetchData();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [email, saveTotalEventServiceAITList]);

  useEffect(() => {
    let unsubscribe;
    if (email) {
      function fetchData() {
        let queryRef = query(
          collection(db, "approvals"),
          orderBy("date", "desc"),
          where("ApprovalRequestSentTo", "array-contains", email)
        );

        unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
          const lista = [];
          ItemFirebase.forEach((doc) => {
            lista.push(doc.data());
          });
          saveApprovalListnew(lista);
          // console.log("approvals");
        });
      }
      fetchData();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [email, saveApprovalListnew]);

  return { posts, isLoading, companyName };
};

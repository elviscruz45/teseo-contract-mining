import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Linking, FlatList, Text } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { ConnectedInfoUser } from "../../../components/Account";
import { styles } from "./ProfileScreen.styles";
import { connect } from "react-redux";
import { update_firebaseUserUid } from "../../../actions/auth";
import { ConnectedChangeDisplayNameForm } from "../../../components/Account/ChangeDisplayNameForm";
import { Modal } from "../../../components/shared/Modal";
import { getExcelGLobal } from "../../../utils/excelData";
import { update_firebaseProfile } from "../../../actions/profile";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../utils";
import { Image as ImageExpo } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

function ProfileScreen(props) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [_, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const navigation = useNavigation();

  const onReload = () => setReload((prevState) => !prevState);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    props.update_firebaseUserUid("");
    props.update_firebaseProfile("");
  };

  const update_Data = () => {
    setRenderComponent(
      <ConnectedChangeDisplayNameForm onClose={onCloseOpenModal} />
    );
    setShowModal(true);
  };
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "posts"),
        where("emailPerfil", "==", props.email)
      );
      const unsubscribe = onSnapshot(q, (querySnapshotFirebase) => {
        const lista = [];
        querySnapshotFirebase.forEach((doc) => {
          lista.push(doc.data());
        });

        const sortedFirestore = lista.sort(
          (a, b) => new Date(b.fechaPostISO) - new Date(a.fechaPostISO)
        );

        setPost(sortedFirestore);
      });
      setIsLoading(false);
    }
    fetchData();
  }, []);
  const comentPost = (item) => {
    navigation.navigate(screen.home.tab, {
      screen: screen.home.comment,
      params: { Item: item },
    });
  };
  return (
    <>
      <View>
        <ConnectedInfoUser />

        <Button
          title="Actualizar Informacion"
          buttonStyle={styles.btnActualizarStyles}
          titleStyle={styles.btnTextStyle}
          onPress={update_Data}
        />

        <Button
          title="Cerrar sesión"
          buttonStyle={styles.btncerrarStyles}
          titleStyle={styles.btnTextStyle}
          onPress={logout}
        />
        <Modal show={showModal} close={onCloseOpenModal}>
          {renderComponent}
        </Modal>
      </View>
      <Icon
        reverse
        type="material-community"
        name="file-excel"
        color="#8CBBF1"
        containerStyle={styles.btnContainer2}
        onPress={getExcelGLobal}
      />

      <FlatList
        data={post}
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
                    <Text style={styles.name2}>
                      {item.equipoTag} {item.titulo}
                    </Text>
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
      />
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    profile: reducers.profile.firebase_user_name,

    email: reducers.profile.email,
  };
};

export const ConnectedProfileScreen = connect(mapStateToProps, {
  update_firebaseUserUid,
  update_firebaseProfile,
})(ProfileScreen);

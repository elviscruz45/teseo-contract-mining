import React, { useState, useContext } from "react";
// import TabNavigator from "./TabNavigator";
// import { app } from "../config/firebase";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { View, Text } from "react-native";
import { AppNavigation } from "./AppNavigation";
import { AuthScreen } from "../screens/Auth/AuthScreen";
import { connect } from "react-redux";

function LoginNavigator(props) {
  console.log("fromLoginNavigator", props);
  return <>{props.firebase_user_uid ? <AppNavigation /> : <AuthScreen />}</>;
}

const mapStateToProps = (reducers) => {
  return reducers.auth;
};

export const ConnectedLoginNavigator = connect(mapStateToProps)(LoginNavigator);

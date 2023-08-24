import React from "react";
import { AppNavigation } from "./AppNavigation";
import { AuthScreen } from "../screens/Auth/AuthScreen";
import { connect } from "react-redux";

function LoginNavigator(props) {
  console.log("LoginNavigator");
  console.log("firebase_user_uid", props.firebase_user_uid);

  const content = props.firebase_user_uid ? <AppNavigation /> : <AuthScreen />;

  return <>{content}</>; //this screen shows a form to log in
}

const mapStateToProps = (reducers) => {
  return reducers.auth;
};

export const ConnectedLoginNavigator = connect(mapStateToProps)(LoginNavigator);

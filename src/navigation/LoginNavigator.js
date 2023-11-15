import React from "react";
import { AppNavigation } from "./AppNavigation";
import { AuthScreen } from "../screens/Auth/AuthScreen";
import { connect } from "react-redux";

function LoginNavigator(props) {
  const content = props.firebase_user_uid ? <AppNavigation /> : <AuthScreen />;

  return <>{content}</>;
}

const mapStateToProps = (reducers) => {
  return reducers.auth;
};

export const ConnectedLoginNavigator = connect(mapStateToProps)(LoginNavigator);

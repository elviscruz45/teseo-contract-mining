export const update_firebaseUserUid = (firebase_uid) => (dispatch) => {
  dispatch({
    type: "UPDATE_FIREBASEUSERUID",
    payload: firebase_uid,
  });
};

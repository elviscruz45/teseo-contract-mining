export const update_firebaseUserName = (firebase_name) => (dispatch) => {
  dispatch({
    type: "UPDATE_FIREBASEUSERNAME",
    payload: firebase_name,
  });
};

export const update_firebasePhoto = (firebase_photo) => (dispatch) => {
  dispatch({
    type: "UPDATE_FIREBASEPHOTO",
    payload: firebase_photo,
  });
};

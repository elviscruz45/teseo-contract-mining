const INITIAL_STATE = {
  firebase_user_uid: null,
  user_photo:
    "https://firebasestorage.googleapis.com/v0/b/valentine-app-ac496.appspot.com/o/rsz_elvis_cruz_verano.jpeg?alt=media&token=af2faafa-c372-4f97-8793-1caea61c9910",
  equipment_photo:
    "https://firebasestorage.googleapis.com/v0/b/valentine-app-ac496.appspot.com/o/CHI.jpeg?alt=media&token=b578d26f-a92b-4125-9022-a8c3537134aa",
};

export function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATE_FIREBASEUSERUID":
      return { ...state, firebase_user_uid: action.payload };
    default:
      return state;
  }
}

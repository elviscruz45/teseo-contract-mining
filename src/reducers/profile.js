const INITIAL_STATE = {
  firebase_user_name: null,
  user_photo: null,
};

export function profile(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATE_FIREBASEUSERNAME":
      return { ...state, firebase_user_name: action.payload };
    case "UPDATE_FIREBASEPHOTO":
      return { ...state, user_photo: action.payload };
    default:
      return state;
  }
}

const INITIAL_STATE = {
  profile: null,
  firebase_user_name: null,
  user_photo: null,
  email: null,
  uid: null,
};

export function profile(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATE_FIREBASEUSERNAME":
      return { ...state, firebase_user_name: action.payload };
    case "UPDATE_FIREBASEPHOTO":
      return { ...state, user_photo: action.payload };
    case "UPDATE_FIREBASEEMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_FIREBASEPROFILE":
      return { ...state, profile: action.payload };
    case "UPDATE_FIREBASEID":
      return { ...state, uid: action.payload };

    default:
      return state;
  }
}

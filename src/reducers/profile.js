const INITIAL_STATE = {
  profile: null,
  firebase_user_name: null,
  user_photo: null,
  email: null,
  uid: null,
  approvalQuantity: 0,
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

    case "UPDATE_APPROVALQUANTITY":
      return { ...state, approvalQuantity: action.payload };

    default:
      return state;
  }
}

// export const update_approvalQuantity = (firebase_uid) => (dispatch) => {
//   dispatch({
//     type: "UPDATE_APPROVALQUANTITY",
//     payload: firebase_uid,
//   })}

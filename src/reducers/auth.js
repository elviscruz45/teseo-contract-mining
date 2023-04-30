const INITIAL_STATE = {
  firebase_user_uid: null,
};

export function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATE_FIREBASEUSERUID":
      return { ...state, firebase_user_uid: action.payload };
    default:
      return state;
  }
}

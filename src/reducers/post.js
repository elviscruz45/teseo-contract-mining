const INITIAL_STATE = {
  savePhotoUri: "",
  actualServiceAIT: null,
  ActualPostFirebase: null,
  ActualServiceAITList: null,
};

export function post(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SAVE_PHOTO_URI":
      return {
        ...state,
        savePhotoUri: action.payload,
      };
    case "SAVE_ACTUALSERVICEAIT":
      return {
        ...state,
        actualServiceAIT: action.payload,
      };
    case "SAVE_ACTUALPOSTFIREBASE":
      return {
        ...state,
        ActualPostFirebase: action.payload,
      };
    case "SAVE_ACTUALSERVICEAITLIST":
      return {
        ...state,
        ActualServiceAITList: action.payload,
      };
    default:
      return state;
  }
}

const INITIAL_STATE = {
  savePhotoUri: "",
  actualEquipment: null,
};

export function post(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SAVE_PHOTO_URI":
      return {
        ...state,
        savePhotoUri: action.payload,
      };
    case "SAVE_ACTUALEQUIPMENT":
      return {
        ...state,
        actualEquipment: action.payload,
      };

    default:
      return state;
  }
}

const INITIAL_STATE = {
  home: "elvis",
  equipmentList: [],
  totalEventServiceAITLIST: [],
  postPerPage: 5,
};

export function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SOMETHING":
      return { ...state };
    case "EQUIPMENTLISTUPPER":
      return { ...state, equipmentList: action.payload };
    case "SAVE_TOTALEVENTSERVICEAITLIST":
      return { ...state, totalEventServiceAITLIST: action.payload };
    case "RESET_POSTPERPAGEHOME":
      return { ...state, postPerPage: action.payload };
    default:
      return state;
  }
}

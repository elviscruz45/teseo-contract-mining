const INITIAL_STATE = {
  home: "elvis",
  equipmentList: [],
  totalEventServiceAITLIST: [],
  postPerPage: 10,
  servicesData: null,
  approvalList: null,
};

export function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SOMETHING":
      return { ...state };
    case "EQUIPMENTLISTUPPER":
      return { ...state, equipmentList: action.payload };
    case "SAVE_TOTALEVENTSERVICEAITLIST":
      return {
        ...state,
        totalEventServiceAITLIST: [
          ...state.totalEventServiceAITLIST,
          ...action.payload,
        ],
      };
    case "RESET_POSTPERPAGEHOME":
      return { ...state, postPerPage: action.payload };

    case "UPDATE_APPROVALLIST":
      return { ...state, approvalList: action.payload };

    case "UPDATE_AITSERVICESDATA":
      return { ...state, servicesData: action.payload };
    default:
      return state;
  }
}

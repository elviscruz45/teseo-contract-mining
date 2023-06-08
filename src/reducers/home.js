const INITIAL_STATE = { home: "elvis", equipmentList: [] };

export function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SOMETHING":
      return { ...state };
    case "EQUIPMENTLISTUPPER":
      return { ...state, equipmentList: action.payload };
    default:
      return state;
  }
}

const INITIAL_STATE = { home: "elvis" };

export function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SOMETHING":
      return { ...state };
    default:
      return state;
  }
}

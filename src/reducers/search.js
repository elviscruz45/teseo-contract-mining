const INITIAL_STATE = {};

export function search(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SOMETHING":
      return { ...state };
    default:
      return state;
  }
}

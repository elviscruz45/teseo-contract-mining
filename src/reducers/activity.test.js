import { activity } from "./activity";

describe("activity reducer", () => {
  it("should return the initial state", () => {
    const initialState = {
      /* initial state object */
    };
    const action = { type: "INITIAL_ACTION" };
    const nextState = activity(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it("should handle the SOMETHING action", () => {
    const initialState = {
      /* initial state object */
    };
    const action = { type: "SOMETHING" };
    const nextState = activity(initialState, action);
    expect(nextState).toEqual(initialState); // or update the state object as per your requirement
  });

  it("should handle unknown actions", () => {
    const initialState = {
      /* initial state object */
    };
    const action = { type: "UNKNOWN_ACTION" };
    const nextState = activity(initialState, action);
    expect(nextState).toEqual(initialState);
  });
});

import { search } from "./search";

describe("search reducer", () => {
  //   it("should return the initial state", () => {
  //     expect(search(undefined, {})).toEqual({
  //       approvalListNew: [],
  //     });
  //   });

  it("should handle SAVE_APPROVALLISTNEW", () => {
    const initialState = {
      approvalListNew: [],
    };

    const action = {
      type: "SAVE_APPROVALLISTNEW",
      payload: ["item1", "item2"],
    };

    const expectedState = {
      approvalListNew: ["item1", "item2"],
    };

    expect(search(initialState, action)).toEqual(expectedState);
  });

  it("should return the current state for unknown action types", () => {
    const initialState = {
      approvalListNew: ["item1", "item2"],
    };

    const action = {
      type: "UNKNOWN_ACTION",
      payload: "test",
    };

    expect(search(initialState, action)).toEqual(initialState);
  });
});

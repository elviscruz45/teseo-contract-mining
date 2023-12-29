import { rootReducers } from "./index";
import { combineReducers } from "redux";

describe("rootReducers", () => {
  it("combines all reducers correctly", () => {
    const expectedReducers = {
      home: expect.any(Function),
      profile: expect.any(Function),
      post: expect.any(Function),
      activity: expect.any(Function),
      search: expect.any(Function),
      auth: expect.any(Function),
    };

    expect(rootReducers).toEqual(combineReducers(expectedReducers));
  });
});

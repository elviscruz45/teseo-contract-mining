import { home } from "./home";

describe("home reducer", () => {
  it("should return the initial state", () => {
    const initialState = {
      /* define your initial state here */
    };
    const action = { type: "UNKNOWN_ACTION" };
    const newState = home(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it("should handle SOMETHING action", () => {
    const initialState = {
      /* define your initial state here */
    };
    const action = { type: "SOMETHING" };
    const newState = home(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it("should handle EQUIPMENTLISTUPPER action", () => {
    const initialState = {
      /* define your initial state here */
    };
    const action = { type: "EQUIPMENTLISTUPPER", payload: "PRIMARY CRUSHER" };
    const newState = home(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      equipmentList: action.payload,
    });
  });

  it("should handle SAVE_TOTALEVENTSERVICEAITLIST action", () => {
    const initialState = {
      /* define your initial state here */
    };
    const action = {
      type: "SAVE_TOTALEVENTSERVICEAITLIST",
      payload: "PRIMARY CRUSHER",
    };
    const newState = home(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      totalEventServiceAITLIST: action.payload,
    });
  });

  it("should handle RESET_POSTPERPAGEHOME action", () => {
    const initialState = {
      /* define your initial state here */
    };
    const action = {
      type: "RESET_POSTPERPAGEHOME",
      payload: "PRIMARY CRUSHER",
    };
    const newState = home(initialState, action);
    expect(newState).toEqual({ ...initialState, postPerPage: action.payload });
  });

  it("should handle UPDATE_APPROVALLIST action", () => {
    const initialState = {
      /* define your initial state here */
    };
    const action = { type: "UPDATE_APPROVALLIST", payload: "PRIMARY CRUSHER" };
    const newState = home(initialState, action);
    expect(newState).toEqual({ ...initialState, approvalList: action.payload });
  });

  it("should handle UPDATE_AITSERVICESDATA action", () => {
    const initialState = {
      /* define your initial state here */
    };
    const action = {
      type: "UPDATE_AITSERVICESDATA",
      payload: "PRIMARY CRUSHER",
    };
    const newState = home(initialState, action);
    expect(newState).toEqual({ ...initialState, servicesData: action.payload });
  });
});

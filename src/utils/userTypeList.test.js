import { userTypeList } from "./userTypeList";

describe("userTypeList", () => {
  test("should be defined", () => {
    expect(userTypeList).toBeDefined();
  });

  test("should have the correct keys", () => {
    const expectedKeys = ["manager", "supervisor", "planner", "worker"];
    const actualKeys = Object.keys(userTypeList);
    expect(actualKeys).toEqual(expectedKeys);
  });

  test("should have the correct values", () => {
    const expectedValues = {
      manager: "Gerente",
      supervisor: "Supervisor",
      planner: "Planificador",
      worker: "Trabajador",
    };
    expect(userTypeList).toEqual(expectedValues);
  });
});

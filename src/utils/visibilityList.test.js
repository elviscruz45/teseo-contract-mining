import { visibilityList } from "./visibilityList";

describe("visibilityList", () => {
  test("is an array", () => {
    expect(Array.isArray(visibilityList)).toBe(true);
  });

  test("contains the expected values", () => {
    const expectedValues = [
      {
        value: "Todos",
      },
      {
        value: "Solo Empresa Contratista",
      },
    ];

    expect(visibilityList).toEqual(expectedValues);
  });
});

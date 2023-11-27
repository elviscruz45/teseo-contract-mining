import { TipoFileLists } from "./TipoFileList";

describe("TipoFileLists", () => {
  test("should contain the correct number of items", () => {
    expect(TipoFileLists).toHaveLength(5);
  });

  test("should contain the expected values", () => {
    const expectedValues = ["PET", "Plano", "3D", "Alcance", "Otro"];
    const actualValues = TipoFileLists.map((item) => item.value);
    expect(actualValues).toEqual(expectedValues);
  });
});

import { IngenieriayFabricacion } from "./tipoServicioList";

describe("IngenieriayFabricacion", () => {
  test("should contain an array of objects", () => {
    expect(Array.isArray(IngenieriayFabricacion)).toBe(true);
    expect(IngenieriayFabricacion.length).toBeGreaterThan(0);
    expect(typeof IngenieriayFabricacion[0]).toBe("object");
  });

  test("each object should have a 'value' property of type string", () => {
    IngenieriayFabricacion.forEach((item) => {
      expect(typeof item.value).toBe("string");
    });
  });

  test("each object should have a 'progress' property of type number", () => {
    IngenieriayFabricacion.forEach((item) => {
      expect(typeof item.progress).toBe("number");
    });
  });

  test("the 'progress' property should be within the range of 0 to 100", () => {
    IngenieriayFabricacion.forEach((item) => {
      expect(item.progress).toBeGreaterThanOrEqual(0);
      expect(item.progress).toBeLessThanOrEqual(100);
    });
  });
});

import { etapaLists } from "./etapaList";

describe("etapaLists", () => {
  test("should contain an array of objects", () => {
    expect(Array.isArray(etapaLists)).toBe(true);
    expect(etapaLists.length).toBeGreaterThan(0);
    expect(typeof etapaLists[0]).toBe("object");
  });

  test("each object should have a 'value' property", () => {
    etapaLists.forEach((etapa) => {
      expect(etapa).toHaveProperty("value");
      expect(typeof etapa.value).toBe("string");
    });
  });

  test("each 'value' property should have a non-empty string value", () => {
    etapaLists.forEach((etapa) => {
      expect(etapa.value).toBeTruthy();
      expect(typeof etapa.value).toBe("string");
      expect(etapa.value.length).toBeGreaterThan(0);
    });
  });
});

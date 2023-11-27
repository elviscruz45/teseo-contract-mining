import { monedaList } from "./MonedaList";

describe("monedaList", () => {
  test("should contain three currency values", () => {
    expect(monedaList).toHaveLength(3);
  });

  test("should contain the currency value 'Soles'", () => {
    const currency = monedaList.find((item) => item.value === "Soles");
    expect(currency).toBeDefined();
  });

  test("should contain the currency value 'Dolares'", () => {
    const currency = monedaList.find((item) => item.value === "Dolares");
    expect(currency).toBeDefined();
  });

  test("should contain the currency value 'Euros'", () => {
    const currency = monedaList.find((item) => item.value === "Euros");
    expect(currency).toBeDefined();
  });
});

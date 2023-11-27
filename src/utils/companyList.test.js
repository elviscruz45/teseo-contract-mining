import { companyListFormat } from "./companyList";

describe("companyListFormat", () => {
  test("should be an array", () => {
    expect(Array.isArray(companyListFormat)).toBe(true);
  });

  test("should contain objects with 'value' property", () => {
    companyListFormat.forEach((item) => {
      expect(item).toHaveProperty("value");
    });
  });

  test("should have at least one item", () => {
    expect(companyListFormat.length).toBeGreaterThan(0);
  });
});

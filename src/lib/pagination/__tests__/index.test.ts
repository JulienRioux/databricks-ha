import { generatePaginationNumbers } from "../";

describe("generatePaginationNumbers", () => {
  it("should return up to 7 numbers, centered around current, in early pages", () => {
    expect(generatePaginationNumbers({ total: 10, current: 1 })).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  it("should return up to 7 numbers, centered around current, in middle pages", () => {
    expect(generatePaginationNumbers({ total: 10, current: 5 })).toEqual([
      2, 3, 4, 5, 6, 7, 8,
    ]);
  });

  it("should return up to 7 numbers, centered around current, in late pages", () => {
    expect(generatePaginationNumbers({ total: 10, current: 10 })).toEqual([
      4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it("should handle cases where total pages is less than 7", () => {
    expect(generatePaginationNumbers({ total: 5, current: 3 })).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });

  it("should adjust range when current page is near the start", () => {
    expect(generatePaginationNumbers({ total: 10, current: 2 })).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  it("should adjust range when current page is near the end", () => {
    expect(generatePaginationNumbers({ total: 10, current: 9 })).toEqual([
      4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it("should return an empty array when total pages is 0", () => {
    expect(generatePaginationNumbers({ total: 0, current: 0 })).toEqual([]);
  });

  // These 2 edges cases should never happens but if they do, it should work as expected.
  it("should handle cases where current page exceeds total pages", () => {
    expect(generatePaginationNumbers({ total: 5, current: 6 })).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });

  it("should ensure current page is never less than 1", () => {
    expect(generatePaginationNumbers({ total: 10, current: -1 })).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });
});

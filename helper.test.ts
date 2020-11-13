import { lengthCheck, formatCheck, isValidResponse } from "./helper";

describe("Test checking functions", () => {
  describe("Test lengthCheck", () => {
    test("Given less than 100 characters name, expect no error", () => {
      expect(() => {
        lengthCheck("John");
      }).not.toThrowError(Error);
    });
    test("Given more than 100 characters name, expect error", () => {
      expect(() => {
        lengthCheck(
          "lsajflksdjfl;sdjaf;lsdjafdasfdasflasdjf;ldjasfdasfdasfklsdjafkljsdafkljasf;lasdfjklsdjfldjs;llkfsdja;lfjsal;fj;lasjjjjklsfjlksdj;lfjdsa"
        );
      }).toThrowError(Error);
    });
  });
  describe("Test formatCheck", () => {
    test("Given correct date format, expect no error", () => {
      expect(() => {
        formatCheck("1995-05-21");
      }).not.toThrowError(Error);
    });
    test("Given wrong date format, expect error saying wrong format", () => {
      expect(() => {
        formatCheck("199-05-13");
      }).toThrowError("format");
      expect(() => {
        formatCheck("1995-5-13");
      }).toThrowError("format");
      expect(() => {
        formatCheck("1995-05-3");
      }).toThrowError("format");
    });
    test("Given invalid date, expect error saying invalid date", () => {
      expect(() => {
        formatCheck("1995-23-13");
      }).toThrowError("valid");
      expect(() => {
        formatCheck("1995-12-45");
      }).toThrowError("valid");
    });
  });
  describe("Test isValid", () => {
    test("Given correct input, return true", () => {
      expect(isValidResponse({ data: "something" })).toBeTruthy();
    });
    test("Given the wrong input, return false", () => {
      expect(isValidResponse({ text: "something else" })).toBeFalsy();
    });
  });
});

import { kycCheck, lengthCheck, formatCheck } from "./index";
import axios from "axios";
import { format } from "path";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Given correct input data and verificationResultCode, check returned value", () => {
  test("verificationResultCode N, expect kyrcResult: false", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        verifyDocumentResult: { type: "DriverLicenceResponse" },
        verificationRequestNumber: 12345,
        verificationResultCode: "N",
      },
    });

    expect(
      await kycCheck(
        "1999-12-20",
        "Albert",
        "Wingman",
        "111222333444",
        "NSW",
        "2020-12-20",
        "Eugene"
      )
    ).toEqual({ kyrcResult: false });
  });

  test("verificationResultCode Y, expect kyrcResult: true", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        verifyDocumentResult: { type: "DriverLicenceResponse" },
        verificationRequestNumber: 12345,
        verificationResultCode: "Y",
      },
    });

    expect(
      await kycCheck(
        "1999-12-20",
        "Albert",
        "Wingman",
        "111222333444",
        "NSW",
        "2020-12-20",
        "Eugene"
      )
    ).toEqual({ kyrcResult: true });
  });

  test("verificationResultCode D, expect code: D, message: Document Error", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        verifyDocumentResult: { type: "DriverLicenceResponse" },
        verificationRequestNumber: 12345,
        verificationResultCode: "D",
      },
    });

    expect(
      await kycCheck(
        "1999-12-20",
        "Albert",
        "Wingman",
        "111222333444",
        "NSW",
        "2020-12-20",
        "Eugene"
      )
    ).toEqual({ code: "D", message: "Document Error" });
  });

  test("verificationResultCode S, expect code: S, message: Server Error", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        verifyDocumentResult: { type: "DriverLicenceResponse" },
        verificationRequestNumber: 12345,
        verificationResultCode: "S",
      },
    });

    expect(
      await kycCheck(
        "1999-12-20",
        "Albert",
        "Wingman",
        "111222333444",
        "NSW",
        "2020-12-20",
        "Eugene"
      )
    ).toEqual({ code: "S", message: "Server Error" });
  });
});

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
});

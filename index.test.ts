import kycCheck from "./index";
import axios from "axios";

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

  test("verificationResultCode D, expect code: D, message: Document Error", () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        verifyDocumentResult: { type: "DriverLicenceResponse" },
        verificationRequestNumber: 12345,
        verificationResultCode: "D",
      },
    });

    expect(async () => {
      await kycCheck(
        "1999-12-20",
        "Albert",
        "Wingman",
        "111222333444",
        "NSW",
        "2020-12-20",
        "Eugene"
      );
    }).toThrowError();
  });

  test("verificationResultCode S, expect code: S, message: Server Error", () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        verifyDocumentResult: { type: "DriverLicenceResponse" },
        verificationRequestNumber: 12345,
        verificationResultCode: "S",
      },
    });

    expect(async () => {
      await kycCheck(
        "1999-12-20",
        "Albert",
        "Wingman",
        "111222333444",
        "NSW",
        "2020-12-20",
        "Eugene"
      );
    }).toThrowError();
  });
});

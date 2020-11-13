import kycCheck from "./index";
import axios from "axios";
import VerifyDocumentError from "./customError";
import { Verify } from "crypto";

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
    expect.assertions(1);

    return kycCheck(
      "1999-12-20",
      "Albert",
      "Wingman",
      "111222333444",
      "NSW",
      "2020-12-20",
      "Eugene"
    ).catch((e) => {
      expect(e).toBeInstanceOf(VerifyDocumentError);
    });
  });

  test("verificationResultCode S, expect code: S, message: Server Error", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        verifyDocumentResult: { type: "DriverLicenceResponse" },
        verificationRequestNumber: 12345,
        verificationResultCode: "S",
      },
    });

    expect.assertions(1);

    return kycCheck(
      "1999-12-20",
      "Albert",
      "Wingman",
      "111222333444",
      "NSW",
      "2020-12-20",
      "Eugene"
    ).catch((e) => {
      expect(e).toBeInstanceOf(VerifyDocumentError);
    });
  });
});

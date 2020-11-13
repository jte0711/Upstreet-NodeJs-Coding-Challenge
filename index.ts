import * as dotenv from "dotenv";
import * as axios from "axios";
import { KYCCheck, userData } from "./types";
import VerifyDocumentError from "./customError";
import { isValidResponse, lengthCheck, formatCheck } from "./helper";

const ax = axios.default;
const config = dotenv.config({ path: "./.env" });

const checkDriverLicense = async (data: userData) => {
  const reqConfig = {
    headers: {
      Authorization: "Bearer " + process.env.API_KEY,
      "Access-Control-Allow-Origin": "*",
    },
  };

  return await ax
    .post(process.env.API_ENDPOINT, data, reqConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return { status: e.response.status, statusText: e.response.statusText };
    });
};

const kycCheck: KYCCheck = async (
  dob,
  fName,
  lName,
  licenseNumb,
  state,
  expDate,
  mName
) => {
  try {
    // Check if fname, mname, and lastname within 100 char limit
    lengthCheck(fName);
    lengthCheck(lName);
    mName ? lengthCheck(mName) : null;

    // Check if dob and expiry date within format
    formatCheck(dob);
    expDate ? formatCheck(expDate) : null;
  } catch (error) {
    console.log(error);
    return;
  }

  let data: userData = {
    birthDate: dob,
    givenName: fName,
    middleName: mName,
    familyName: lName,
    licenceNumber: licenseNumb,
    stateOfIssue: state,
    expiryDate: expDate,
  };

  // POST data
  const response = await checkDriverLicense(data);

  if (!isValidResponse(response)) {
    try {
      throw new Error(
        `API Request return Status Code ${response.status} ${response.statusText}`
      );
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const resCode = response["data"].verificationResultCode;

  // Return value depending on verificationResultCode
  if (resCode === "Y") {
    return { kyrcResult: true };
  } else if (resCode === "N") {
    return { kyrcResult: false };
  } else {
    throw new VerifyDocumentError(
      JSON.stringify({
        code: resCode === "D" ? "D" : "S",
        message: resCode === "D" ? "Document Error" : "Server Error",
      })
    );
  }
};

export { kycCheck as default };

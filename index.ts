import * as dotenv from "dotenv";
import * as axios from "axios";
import { runInContext } from "vm";

const ax = axios.default;
const config = dotenv.config({ path: "./.env" });

type stateName = "NSW" | "QLD" | "ACT" | "SA" | "TAS" | "VIC" | "WA" | "NT";
type kycResult = { kyrcResult?: boolean; code?: string; message?: string };

interface KYCCheck {
  (
    dob: string,
    fName: string,
    lName: string,
    licenseNumb: string,
    state: stateName,
    expiryDate?: string,
    mName?: string
  ): void | Promise<kycResult>;
}

const lengthCheck = (word: string) => {
  if (word.length > 100) {
    throw new Error(`"${word}" exceeds 100 characters limit`);
  }
};

const formatCheck = (date: string) => {
  const correctFormat: RegExp = /^\d{4}[-]\d{2}[-]\d{2}$/;
  const correctDate: RegExp = /^\d{4}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
  if (!correctFormat.test(date)) {
    throw new Error(`"${date}" must be in YYYY-MM-DD format`);
  }
  if (!correctDate.test(date)) {
    throw new Error(`${date}" must be a valid date`);
  }
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

  let data = {
    birthDate: dob,
    givenName: fName,
    middleName: mName,
    familyName: lName,
    licenceNumber: licenseNumb,
    stateOfIssue: state,
    expiryDate: expDate,
  };

  let config = {
    headers: {
      Authorization: "Bearer " + process.env.API_KEY,
      "Access-Control-Allow-Origin": "*",
    },
  };

  // POST data
  const response = await ax
    .post(process.env.API_ENDPOINT, data, config)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log("THIS IS ERROR \n", e);
    });

  const resCode = response["data"].verificationResultCode;
  console.log("This is resCode = ", resCode); // Delete this later

  // Return value depending on verificationResultCode
  if (resCode === "Y") {
    return { kyrcResult: true };
  } else if (resCode === "N") {
    return { kyrcResult: false };
  } else {
    return {
      code: resCode === "D" ? "D" : "S",
      message: resCode === "D" ? "Document Error" : "Server Error",
    };
  }
};

// Temporary Checking
const runCheck = async () => {
  const res = await kycCheck(
    "1999-02-21",
    "Johnny",
    "Goodman",
    "94977000",
    "VIC",
    "2020-01-01",
    "Robert"
  );

  console.log(res);
};

runCheck();

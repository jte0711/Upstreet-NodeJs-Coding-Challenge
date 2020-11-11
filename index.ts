import * as dotenv from "dotenv";

const config = dotenv.config({ path: "./.env" });

type stateName = "NSW" | "QLD" | "ACT" | "SA" | "TAS" | "VIC" | "WA" | "NT";
type kycResult = { kyrcResult: boolean };

interface KYCCheck {
  (
    dob: string,
    fName: string,
    lName: string,
    licenseNumb: string,
    state: stateName,
    expiryDate?: string,
    mName?: string
  ): void | kycResult;
}

const kycCheck = () => {};

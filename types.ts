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

interface userData {
  birthDate: string;
  givenName: string;
  familyName: string;
  licenceNumber: string;
  stateOfIssue: stateName;
  expiryDate?: string;
  middleName?: string;
}

interface APIResponse {
  data: Object;
}

export { userData, stateName, kycResult, KYCCheck, APIResponse };

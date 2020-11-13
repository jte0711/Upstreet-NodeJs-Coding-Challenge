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

interface APIResponse {
  data: Object;
}

export { stateName, kycResult, KYCCheck, APIResponse };

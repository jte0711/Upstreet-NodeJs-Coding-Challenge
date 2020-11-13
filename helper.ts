import { APIResponse } from "./types";

const isValidResponse = (res: any): res is APIResponse => {
  return (res as APIResponse).data !== undefined;
};

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

export { isValidResponse, lengthCheck, formatCheck };

export default class VerifyDocumentError extends Error {
  constructor(m: string) {
    super(m);
    this.name = "VerifyDocumentError";
    Object.setPrototypeOf(this, VerifyDocumentError.prototype);
  }
}

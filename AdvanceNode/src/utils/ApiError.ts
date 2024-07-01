import { STATUSCODE } from "./enum";

export class ApiError {
  message: string = "";
  code: number = STATUSCODE.BAD_REQUEST;

  constructor(msg: string, errorCode?: number) {
    this.message = msg || "";
    this.code = errorCode || STATUSCODE.BAD_REQUEST;
  }
}

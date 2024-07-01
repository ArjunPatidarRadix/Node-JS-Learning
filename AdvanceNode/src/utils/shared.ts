import { IApplicant } from "../models/IApplicant";
import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError";
import { FastifyReply } from "fastify";
import { STATUSCODE } from "./enum";

type IError = {
  message: string;
  code: number;
};
export function generateErrorMessage(code: number, message: string): IError {
  return {
    code,
    message,
  };
}
export function sendErrorMessageFastifyObject(
  res: FastifyReply,
  apiError: ApiError
): void {
  res
    .status(
      !apiError.code || apiError.code === 11000
        ? STATUSCODE.BAD_REQUEST
        : apiError.code
    )
    .send({
      code:
        !apiError.code || apiError.code === 11000
          ? STATUSCODE.BAD_REQUEST
          : apiError.code,
      message: apiError.message,
    });
}

export function generateAuthToken(user: IApplicant): string {
  const token = jwt.sign(
    { _id: user.applicantId.toString() },
    "thisisnewcourses"
  );
  return token;
}

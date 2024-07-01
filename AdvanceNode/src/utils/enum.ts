export enum STATUSCODE {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ROLETYPE {
  RECRUITER = 1,
  USER = 2,
}

export const JWT_SECRET = "thisisatoken";

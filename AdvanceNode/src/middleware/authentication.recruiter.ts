import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { JWT_SECRET, ROLETYPE } from "../utils/enum";
import { Recruiter } from "../dbModel/RecruiterModel";

const authenticationRecruiter = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // Check if authentication token or credentials are present in the request
  const token = request.headers["authorization"]?.replace("Bearer ", "");

  console.log(`Authentication token: `, token);

  if (!token) {
    reply.code(401).send({ error: "Unauthorized" });
    return;
  }
  const decoded: any = jwt.verify(token, JWT_SECRET);

  console.log(`Authentication decoded: `, decoded);

  if (decoded.role !== ROLETYPE.RECRUITER) {
    reply
      .code(401)
      .send({ error: "Unauthorized, Please login as a recruiter to continue" });
  }

  const recruiter = await Recruiter.findOne({
    _id: decoded._id,
    "tokens.token": token,
  });

  console.log("recruiter:: ", recruiter);

  if (!recruiter) {
    reply.code(401).send({ error: "Unauthorized" });
    return;
  }
  request.recruiter = recruiter;
  request.token = token;

  return;
};

export default authenticationRecruiter;

import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { JWT_SECRET, ROLETYPE } from "../utils/enum";
import { IUserSchema, User } from "../dbModel/UserModel";

const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  // Check if authentication token or credentials are present in the request
  const token = request.headers["authorization"]?.replace("Bearer ", "");

  console.log(`Authentication token: `, token);

  if (!token) {
    reply.code(401).send({ error: "Unauthorized" });
    return;
  }
  const decoded: any = jwt.verify(token, JWT_SECRET);

  console.log(`Authentication decoded: `, decoded);

  if (decoded.role !== ROLETYPE.USER) {
    reply
      .code(401)
      .send({ error: "Unauthorized, Please login as a user to continue" });
  }

  const user = await User.findOne({
    _id: decoded._id,
    "tokens.token": token,
  });

  if (!user) {
    throw new Error();
  }
  // console.log(token);
  request.user = user;
  request.token = token;

  return;
};

export default authenticate;

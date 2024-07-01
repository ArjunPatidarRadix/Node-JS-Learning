import { userController } from "../controllers/UserController";
import { FastifyInstance } from "fastify";
import authenticate from "../middleware/authentication";

export default async function userRouter(fastify: FastifyInstance) {
  fastify.post("/user/register", userController.createUser);

  fastify.get(
    "/user/me",
    { preHandler: authenticate },
    async (request, reply) => {
      return reply.send(request.user);
    }
  );

  fastify.post("/user/login", userController.loginUser);

  fastify.get(
    "/user/getIntreviewStatus/:id",
    { preHandler: authenticate },
    async (request: any, reply) => {
      return userController.getInterviewStatusByRecruiter(request, reply);
    }
  );
}

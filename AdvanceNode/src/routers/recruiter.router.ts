import { recruiterController } from "../controllers/RecruiterController";
import { FastifyInstance } from "fastify";
import authenticationRecruiter from "../middleware/authentication.recruiter";

export default async function recruiterRouter(fastify: FastifyInstance) {
  fastify.post("/recruiter/register", recruiterController.createRecruiter);

  fastify.get(
    "/recruiter/me",
    { preHandler: authenticationRecruiter },
    async (request, reply) => {
      return reply.send(request.recruiter);
    }
  );

  fastify.post("/recruiter/login", recruiterController.loginRecruiter);
}

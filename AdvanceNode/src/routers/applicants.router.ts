import { applicantController } from "../controllers/ApplicantController";
import { FastifyInstance, FastifyRequest } from "fastify";
import authenticate from "../middleware/authentication";

export default async function applicantRouter(fastify: FastifyInstance) {
  fastify.post(
    "/applicant/applyInVacancy",
    { preHandler: authenticate },
    async (request: any, reply) => {
      return applicantController.applyInVacancy(request, reply);
    }
  );
  fastify.get(
    "/applicant/myAppliedVacancy",
    { preHandler: authenticate },
    applicantController.myAppliedVacancy
  );
  fastify.get(
    "/applicant/:id",
    { preHandler: authenticate },
    async (request: any, reply) => {
      return applicantController.getApplicationById(request, reply);
    }
  );
}

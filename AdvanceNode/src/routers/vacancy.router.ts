import { FastifyInstance } from "fastify";
import { vacancyController } from "../controllers/VacancyController";
import authenticationRecruiter from "../middleware/authentication.recruiter";

export default async function vacancyRouter(fastify: FastifyInstance) {
  fastify.post(
    "/vacancy",
    { preHandler: authenticationRecruiter },
    async (request: any, reply) => {
      return vacancyController.createVacancy(request, reply);
    }
  );
  fastify.get(
    "/vacancy/:id",
    { preHandler: authenticationRecruiter },
    async (request: any, reply) => {
      return vacancyController.getVacancyById(request, reply);
    }
  );
  fastify.get(
    "/vacancy",
    { preHandler: authenticationRecruiter },
    vacancyController.getAllVacancy
  );
  fastify.put(
    "/vacancy/:id",
    { preHandler: authenticationRecruiter },
    async (request: any, reply) => {
      return vacancyController.updateVacancy(request, reply);
    }
  );
  fastify.delete(
    "/vacancy/:id",
    { preHandler: authenticationRecruiter },
    async (request: any, reply) => {
      return vacancyController.deleteVacancy(request, reply);
    }
  );
}

import { FastifyInstance } from "fastify";
import authenticate from "../middleware/authentication";
import { interviewController } from "../controllers/InterviewController";
import authenticationRecruiter from "../middleware/authentication.recruiter";

export default async function interviewRouter(fastify: FastifyInstance) {
  fastify.post(
    "/interview/schedule",
    { preHandler: authenticationRecruiter },
    async (request: any, reply) => {
      return interviewController.scheduleInterview(request, reply);
    }
  );

  fastify.post(
    "/interview/getSchedule",
    { preHandler: authenticationRecruiter },
    async (request: any, reply) => {
      return interviewController.getInterviewStatusByRecruiter(request, reply);
    }
  );

  fastify.get(
    "/interview/get",
    { preHandler: authenticationRecruiter },
    interviewController.getAllInterviews
  );

  fastify.post(
    "/interview/updateStatus",
    { preHandler: authenticationRecruiter },
    async (request: any, reply) => {
      return interviewController.updateInterviewStatus(request, reply);
    }
  );
}

import { IInterviewSchema } from "../dbModel/interviewModel";
import {
  IApplyInterview,
  interviewService,
} from "../services/InterviewService";
import { STATUSCODE } from "../utils/enum";

import {
  generateErrorMessage,
  sendErrorMessageFastifyObject,
} from "../utils/shared";
import { FastifyReply, FastifyRequest } from "fastify";

export class InterviewController {
  public async scheduleInterview(
    req: FastifyRequest<{ Body: IApplyInterview }>,
    res: FastifyReply
  ): Promise<void> {
    try {
      const vacancy: any = await interviewService.scheduleInterview(req.body);
      res
        .status(STATUSCODE.OK)
        .send({ vacancy, message: "Scheduled interview" });
    } catch (error: any) {
      sendErrorMessageFastifyObject(res, error);
    }
  }

  public async getInterviewStatusByRecruiter(
    req: FastifyRequest<{ Body: IApplyInterview }>,
    res: FastifyReply
  ): Promise<void> {
    try {
      const vacancy: any = await interviewService.getInterviewStatusByRecruiter(
        req.body
      );
      res.status(STATUSCODE.OK).send(vacancy);
    } catch (error: any) {
      sendErrorMessageFastifyObject(res, error);
    }
  }

  public async getAllInterviews(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<void> {
    try {
      const interviews: any = await interviewService.getAllInterviews();
      res.status(STATUSCODE.OK).send(interviews);
    } catch (error: any) {
      sendErrorMessageFastifyObject(res, error);
    }
  }

  public async updateInterviewStatus(
    req: FastifyRequest<{ Body: IApplyInterview }>,
    res: FastifyReply
  ): Promise<void> {
    const updatedVacancyData: IApplyInterview = req.body;

    try {
      const vacancy: IInterviewSchema | null =
        await interviewService.updateInterviewStatus(updatedVacancyData);

      if (vacancy) {
        res.status(STATUSCODE.OK).send(vacancy);
      } else {
        res
          .status(STATUSCODE.NOT_FOUND)
          .send(
            generateErrorMessage(
              STATUSCODE.NOT_FOUND,
              "Interview not found with id this vacancy and applicant id"
            )
          );
      }
    } catch (error: any) {
      console.error("Error updating vacancy:", error);
      sendErrorMessageFastifyObject(res, error);
    }
  }
}

export const interviewController = new InterviewController();

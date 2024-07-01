import {
  IApplyApplicant,
  applicantService,
} from "../services/ApplicantService";
import { STATUSCODE } from "../utils/enum";

import { sendErrorMessageFastifyObject } from "../utils/shared";
import { FastifyReply, FastifyRequest } from "fastify";

export class ApplicantController {
  public async applyInVacancy(
    req: FastifyRequest<{ Body: IApplyApplicant }>,
    res: FastifyReply
  ): Promise<void> {
    try {
      const vacancy: any = await applicantService.applyInVacancy(
        req.body,
        req.user
      );
      res
        .status(STATUSCODE.OK)
        .send({ vacancy, message: "Applied successfully" });
      console.log("req:: ", req.body);
    } catch (error: any) {
      console.error("Error applying vacancy:", error);
      sendErrorMessageFastifyObject(res, error);
    }
  }

  public async myAppliedVacancy(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<void> {
    try {
      const vacancy: any = await applicantService.myAppliedVacancy(req.user);
      res.status(STATUSCODE.OK).send(vacancy);
      console.log("req:: ", req.body);
    } catch (error: any) {
      console.error("Error getting vacancy:", error);
      sendErrorMessageFastifyObject(res, error);
    }
  }

  public async getApplicationById(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ): Promise<void> {
    try {
      const vacancy: any = await applicantService.getApplicationById(
        req.params.id,
        req.user._id
      );
      console.log("vacancy:: ", vacancy);

      res.status(STATUSCODE.OK).send(vacancy);
    } catch (error: any) {
      console.error("Error getting vacancy:", error);
      sendErrorMessageFastifyObject(res, error);
    }
  }
}

export const applicantController = new ApplicantController();

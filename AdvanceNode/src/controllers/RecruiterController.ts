import {
  RecruiterService,
  recruiterService,
} from "../services/RecruiterService";

import { STATUSCODE } from "../utils/enum";
import { FastifyReply, FastifyRequest } from "fastify";
import { IRecruiterSchema } from "../dbModel/RecruiterModel";
import { ILoginRequest } from "../models/ILoginRequest";

export class RecruiterController {
  constructor(private recruiterService: RecruiterService) {}

  public async createRecruiter(
    req: FastifyRequest<{ Body: IRecruiterSchema }>,
    res: FastifyReply
  ): Promise<void> {
    const recruiterData: IRecruiterSchema = req.body;
    const response = await recruiterService.createRecruiter(recruiterData);
    res.status(STATUSCODE.CREATED).send(response);
  }

  public async loginRecruiter(
    req: FastifyRequest<{ Body: ILoginRequest }>,
    res: FastifyReply
  ): Promise<void> {
    try {
      const recruiterData: ILoginRequest = req.body;
      const response = await recruiterService.loginRecruiter(recruiterData);
      res.status(STATUSCODE.CREATED).send(response);
    } catch (error) {
      res.status(STATUSCODE.BAD_REQUEST).send(error);
    }
  }
}

export const recruiterController = new RecruiterController(recruiterService);

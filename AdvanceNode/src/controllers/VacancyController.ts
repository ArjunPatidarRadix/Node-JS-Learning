import { IVacancy } from "../models/IVacancy";
import { VacancyService, vacancyService } from "../services/VacancyService";

import {
  generateErrorMessage,
  sendErrorMessageFastifyObject,
} from "../utils/shared";
import { STATUSCODE } from "../utils/enum";
import { FastifyReply, FastifyRequest } from "fastify";
import { IVacancySchema } from "../dbModel/Vacancy";

export class VacancyController {
  constructor(private vacancyService: VacancyService) {}

  public async createVacancy(
    req: FastifyRequest<{ Body: IVacancy }>,
    res: FastifyReply
  ): Promise<void> {
    const vacancyData: IVacancy = req.body;
    if (
      vacancyData &&
      vacancyData.jobDescription &&
      vacancyData.jobTitle &&
      vacancyData.exprerienceRequired
    ) {
      try {
        await vacancyService.createVacancy(vacancyData);
        return res
          .status(STATUSCODE.CREATED)
          .send(generateErrorMessage(STATUSCODE.CREATED, "Vacancy created"));
      } catch (error: any) {
        sendErrorMessageFastifyObject(
          res,
          generateErrorMessage(STATUSCODE.BAD_REQUEST, "Vacancy already exist")
        );
      }
    } else {
      sendErrorMessageFastifyObject(
        res,
        generateErrorMessage(
          STATUSCODE.BAD_REQUEST,
          "vacancyId, jobDescription, jobTitle and exprerienceRequired not found in request"
        )
      );
    }
  }

  public async getAllVacancy(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<void> {
    const vacancy = await vacancyService.findAllVacancy();
    if (vacancy) {
      res.status(STATUSCODE.OK).send(vacancy);
    } else {
      res
        .status(STATUSCODE.NOT_FOUND)
        .send(generateErrorMessage(STATUSCODE.CREATED, "Vacancies not found"));
    }
  }

  public async getVacancyById(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ): Promise<void> {
    const vacancy = await vacancyService.findVacancyById(req.params.id);
    if (vacancy) {
      res.status(STATUSCODE.OK).send(vacancy);
    } else {
      res
        .status(STATUSCODE.NOT_FOUND)
        .send(
          generateErrorMessage(
            STATUSCODE.NOT_FOUND,
            "Vacancies not found with id " + req.params.id
          )
        );
    }
  }

  public async updateVacancy(
    req: FastifyRequest<{ Params: { id: string }; Body: IVacancySchema }>,
    res: FastifyReply
  ): Promise<void> {
    const updatedVacancyData: IVacancySchema = req.body;

    try {
      const vacancy: IVacancy | null = await vacancyService.updateVacancy(
        req.params.id,
        updatedVacancyData
      );

      if (vacancy) {
        res.status(STATUSCODE.OK).send(vacancy);
      } else {
        res
          .status(STATUSCODE.NOT_FOUND)
          .send(
            generateErrorMessage(
              STATUSCODE.NOT_FOUND,
              "Vacancies not found with id " + req.params.id
            )
          );
      }
    } catch (error: any) {
      console.error("Error updating vacancy:", error);
      sendErrorMessageFastifyObject(res, error);
    }
  }

  public async deleteVacancy(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ): Promise<void> {
    try {
      await vacancyService.deleteVacancy(req.params.id);
      res
        .status(STATUSCODE.OK)
        .send(
          generateErrorMessage(STATUSCODE.OK, "Vacancy deleted successfully")
        );
      return;
    } catch (error: any) {
      sendErrorMessageFastifyObject(res, error);
    }
  }
}

export const vacancyController = new VacancyController(vacancyService);

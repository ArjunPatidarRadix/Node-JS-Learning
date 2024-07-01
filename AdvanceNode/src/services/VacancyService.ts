import { IVacancy } from "../models/IVacancy";

import { IVacancySchema, Vacancy } from "../dbModel/Vacancy";
import { ApiError } from "../utils/ApiError";
import { STATUSCODE } from "../utils/enum";

export class VacancyService {
  constructor() {}

  public vacanciesData: IVacancy[] = [];

  public async createVacancy(vacancy: IVacancy): Promise<void> {
    const newVacancy: IVacancySchema = new Vacancy(vacancy);

    // Save the new user document to the database
    await newVacancy.save();
  }

  public async findVacancyById(
    vacancyId: string
  ): Promise<IVacancySchema | null> {
    const task = await Vacancy.findById(vacancyId);
    return task;
  }

  public async findAllVacancy(): Promise<IVacancy[]> {
    const users: IVacancy[] = await Vacancy.find();
    return users;
  }

  public async updateVacancy(
    vacancyId: string,
    updatedVacancy: IVacancySchema
  ): Promise<IVacancySchema> {
    const vacancy: IVacancySchema | null = await this.findVacancyById(
      vacancyId
    );
    if (!vacancy) {
      throw new ApiError("Vacancy not found", STATUSCODE.NOT_FOUND);
    } else {
      const updates = Object.keys(updatedVacancy);
      const allowedUpdates = [
        "jobDescription",
        "jobTitle",
        "exprerienceRequired",
      ];

      const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
      });

      if (!isValidOperation) {
        throw new ApiError("Invalid data found", STATUSCODE.BAD_REQUEST);
      }

      await Vacancy.findByIdAndUpdate(vacancyId, updatedVacancy);

      const updated: IVacancySchema | null = await this.findVacancyById(
        vacancyId
      );

      return updated as IVacancySchema;
    }
  }

  public async deleteVacancy(vacancyId: string): Promise<void> {
    let vacancy: IVacancySchema | null = await this.findVacancyById(vacancyId);
    if (!vacancy) {
      throw new ApiError("Vacancy not found");
    } else {
      await Vacancy.findOneAndDelete({ vacancyId: vacancyId });
    }
  }
}

export const vacancyService = new VacancyService();

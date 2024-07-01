import { IVacancySchema } from "../dbModel/Vacancy";
import { vacancyService } from "./VacancyService";
import { STATUSCODE } from "../utils/enum";
import { ApiError } from "../utils/ApiError";
import { Applicant, IApplicantSchema } from "../dbModel/Applicant";
import { IUserSchema } from "../dbModel/UserModel";

export interface IApplyApplicant {
  vacancyId: string;
  userId: string;
}

export class ApplicantService {
  constructor() {}
  public async applyInVacancy(
    applicantSchema: IApplyApplicant,
    user: IUserSchema
  ): Promise<IApplicantSchema> {
    const vacancy: IVacancySchema | null = await vacancyService.findVacancyById(
      applicantSchema.vacancyId
    );
    console.log("vacancy:: ", vacancy);
    console.log("user:: ", user);
    if (!vacancy) {
      throw new ApiError("Vacancy not found", STATUSCODE.NOT_FOUND);
    } else {
      const checkExist = await Applicant.findOne({
        vacancyId: applicantSchema.vacancyId,
        userId: user._id,
      });

      if (checkExist) {
        throw new ApiError(
          "You have already applied in this vancancy",
          STATUSCODE.BAD_REQUEST
        );
      }

      const applicant = new Applicant({
        vacancyId: applicantSchema.vacancyId,
        userId: user._id,
      });
      await applicant.save();
      return applicant;
    }
  }

  public async myAppliedVacancy(user: IUserSchema): Promise<any> {
    const applicants = await Applicant.find({ userId: user._id }).populate(
      "vacancyId"
    );
    console.log("applicants:: ", applicants);
    return await applicants;
  }

  public async getApplicationById(
    vacancyId: string,
    userId: string
  ): Promise<any> {
    const applicants = await Applicant.findOne({
      userId: userId,
      vacancyId: vacancyId,
    }).populate("vacancyId");
    if (!applicants) {
      throw new ApiError("Application not found", STATUSCODE.NOT_FOUND);
    }
    return await applicants;
  }
}

export const applicantService = new ApplicantService();

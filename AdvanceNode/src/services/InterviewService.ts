import { IVacancySchema } from "../dbModel/Vacancy";
import { STATUSCODE } from "../utils/enum";
import { ApiError } from "../utils/ApiError";
import { Interview, IInterviewSchema } from "../dbModel/interviewModel";
import { IUserSchema } from "../dbModel/UserModel";
import { applicantService } from "./ApplicantService";

export interface IApplyInterview {
  vacancyId: string;
  applicantId: string;
  interviewDate: string;
  feedback: string;
  result: string;
}

export class InterviewService {
  constructor() {}
  public async scheduleInterview(
    interviewSchema: IApplyInterview
  ): Promise<IInterviewSchema> {
    const applicant: IVacancySchema | null =
      await applicantService.getApplicationById(
        interviewSchema.vacancyId,
        interviewSchema.applicantId
      );
    if (!applicant) {
      throw new ApiError(
        "This user did not applied for this vacancy",
        STATUSCODE.NOT_FOUND
      );
    } else {
      const isExist = await Interview.findOne({
        vacancy: interviewSchema.vacancyId,
        applicant: interviewSchema.applicantId,
      });

      if (isExist) {
        throw new ApiError(
          "Interview already scheduled for this applicant",
          STATUSCODE.BAD_REQUEST
        );
      }
      const interview = new Interview({
        vacancy: interviewSchema.vacancyId,
        applicant: interviewSchema.applicantId,
        interviewDate: interviewSchema.interviewDate,
      });
      await interview.save();
      console.log("interview:: ", interview);

      return interview;
    }
  }

  public async getInterviewStatusByRecruiter(
    interviewSchema: IApplyInterview
  ): Promise<IInterviewSchema> {
    const interview = await Interview.findOne({
      vacancy: interviewSchema.vacancyId,
      applicant: interviewSchema.applicantId,
    }).populate(["applicant", "vacancy"]);

    if (!interview) {
      throw new ApiError(
        "There is no interview sheduled for your application",
        STATUSCODE.NOT_FOUND
      );
    }

    return interview;
  }

  public async getAllInterviews(): Promise<IInterviewSchema[]> {
    const interviews = await Interview.find().populate([
      "applicant",
      "vacancy",
    ]);

    if (!interviews) {
      throw new ApiError("No interview exists", STATUSCODE.NOT_FOUND);
    }

    return interviews;
  }

  public async updateInterviewStatus(
    updatedVacancy: IApplyInterview
  ): Promise<IInterviewSchema> {
    const inerview: IInterviewSchema | null =
      await this.getInterviewStatusByRecruiter(updatedVacancy);
    if (!inerview) {
      throw new ApiError("Inerview not found", STATUSCODE.NOT_FOUND);
    } else {
      const dataToUpdate = {
        feedback: updatedVacancy.feedback,
        result: updatedVacancy.result,
      };
      const updates = Object.keys(dataToUpdate);
      const allowedUpdates = ["feedback", "result"];

      const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
      });

      if (!isValidOperation) {
        throw new ApiError("Invalid data found", STATUSCODE.BAD_REQUEST);
      }

      await Interview.findOneAndUpdate(
        {
          vacancy: updatedVacancy.vacancyId,
          applicant: updatedVacancy.applicantId,
        },
        dataToUpdate
      );

      const updated: IInterviewSchema | null =
        await this.getInterviewStatusByRecruiter(updatedVacancy);

      return updated as IInterviewSchema;
    }
  }
}

export const interviewService = new InterviewService();

import { IRecruiterSchema, Recruiter } from "../dbModel/RecruiterModel";
import { ILoginRequest } from "../models/ILoginRequest";

export class RecruiterService {
  constructor() {}

  public vacanciesData: IRecruiterSchema[] = [];

  public async createRecruiter(
    recruiterSchema: IRecruiterSchema
  ): Promise<IRecruiterSchema> {
    const recruiter = new Recruiter(recruiterSchema);
    await recruiter.save();
    const token = await recruiter.generateAuthToken();
    const data = JSON.parse(JSON.stringify(recruiter));
    delete data.tokens;
    delete data.password;
    return { ...data, token };
  }

  public async loginRecruiter(
    recruiterSchema: ILoginRequest
  ): Promise<IRecruiterSchema> {
    const recruiter = await Recruiter.findByCredentials(
      recruiterSchema.email,
      recruiterSchema.password
    );
    const token = await recruiter.generateAuthToken();
    const data = JSON.parse(JSON.stringify(recruiter));
    delete data.tokens;
    delete data.password;
    return { ...data, token };
  }
}

export const recruiterService = new RecruiterService();

import { IUserSchema, User } from "../dbModel/UserModel";
import { IInterviewSchema, Interview } from "../dbModel/interviewModel";
import { ILoginRequest } from "../models/ILoginRequest";
import { ApiError } from "../utils/ApiError";
import { STATUSCODE } from "../utils/enum";

export class UserService {
  constructor() {}

  public vacanciesData: IUserSchema[] = [];

  public async createUser(userSchema: IUserSchema): Promise<IUserSchema> {
    const user = new User(userSchema);
    await user.save();
    const token = await user.generateAuthToken();
    const data = JSON.parse(JSON.stringify(user));
    delete data.tokens;
    delete data.password;
    return { ...data, token };
  }

  public async loginUser(userSchema: ILoginRequest): Promise<IUserSchema> {
    const user = await User.findByCredentials(
      userSchema.email,
      userSchema.password
    );
    const token = await user.generateAuthToken();
    const data = JSON.parse(JSON.stringify(user));
    delete data.tokens;
    delete data.password;
    return { ...data, token };
  }

  public async getInterviewStatusByRecruiter(
    userId: string,
    vacancyId: string
  ): Promise<IInterviewSchema> {
    const interview = await Interview.findOne({
      vacancy: vacancyId,
      applicant: userId,
    }).populate(["applicant", "vacancy"]);

    if (!interview) {
      throw new ApiError(
        "There is no interview sheduled for your application or vacancy not exist ",
        STATUSCODE.NOT_FOUND
      );
    }

    return interview;
  }
}

export const userService = new UserService();

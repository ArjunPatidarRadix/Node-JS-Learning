import { UserService, userService } from "../services/UserService";

import { sendErrorMessageFastifyObject } from "../utils/shared";
import { STATUSCODE } from "../utils/enum";
import { FastifyReply, FastifyRequest } from "fastify";
import { IUserSchema } from "../dbModel/UserModel";
import { ILoginRequest } from "../models/ILoginRequest";

export class UserController {
  constructor(private userService: UserService) {}

  public async createUser(
    req: FastifyRequest<{ Body: IUserSchema }>,
    res: FastifyReply
  ): Promise<void> {
    const userData: IUserSchema = req.body;
    const response = await userService.createUser(userData);
    res.status(STATUSCODE.CREATED).send(response);
  }

  public async loginUser(
    req: FastifyRequest<{ Body: ILoginRequest }>,
    res: FastifyReply
  ): Promise<void> {
    try {
      const userData: ILoginRequest = req.body;
      const response = await userService.loginUser(userData);
      res.status(STATUSCODE.CREATED).send(response);
    } catch (error) {
      res.status(STATUSCODE.BAD_REQUEST).send(error);
    }
  }

  public async getInterviewStatusByRecruiter(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ): Promise<void> {
    try {
      const vacancy: any = await userService.getInterviewStatusByRecruiter(
        req.user._id,
        req.params.id
      );
      res.status(STATUSCODE.OK).send(vacancy);
    } catch (error: any) {
      sendErrorMessageFastifyObject(res, error);
    }
  }
}

export const userController = new UserController(userService);

import { IUserSchema } from "./dbModel/UserModel";

export {};

declare module 'fastify' {
    interface FastifyRequest {
        user: IUserSchema;
        token: string;
    }
}
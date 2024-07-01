import connectDb from "./db/mongoose";
import vacancyRouter from "./routers/vacancy.router";
import applicantRouter from "./routers/applicants.router";
import Fastify, { FastifyInstance } from "fastify";
import fastifyAuth from "@fastify/auth";
import userRouter from "./routers/user.router";
import { IUserSchema } from "./dbModel/UserModel";
import { IRecruiterSchema } from "./dbModel/RecruiterModel";
import recruiterRouter from "./routers/recruiter.router";
import interviewRouter from "./routers/interview.router";

//To add the custom prop in fastify request
declare module "fastify" {
  interface FastifyRequest {
    user: IUserSchema;
    recruiter: IRecruiterSchema;
    token: string;
  }
}

connectDb();
const app: FastifyInstance = Fastify({
  logger: true,
});

const PORT = process.env.PORT;
const HOST = "localhost";

// connectDb();

// app.use(express.json());
app.register(fastifyAuth);

// Register authentication middleware
// app.register(authenticate);

app.register(vacancyRouter, { prefix: "/api" });
app.register(applicantRouter, { prefix: "/api" });
app.register(userRouter, { prefix: "/api" });
app.register(recruiterRouter, { prefix: "/api" });
app.register(interviewRouter, { prefix: "/api" });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(PORT, () => {
//   return console.log(`Express is listening at http://localhost:${port}`);
// });

app.listen({ port: 3030, host: HOST }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
  console.log(`Fastify is listening at :${address}`);
});

import mongoose, { Schema, Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET, ROLETYPE } from "../utils/enum";
import bcrypt from "bcryptjs";

// Define interface for recruiter document

interface IToken {
  token: string;
  createdAt: Date;
}

export interface RecruiterInterface extends IRecruiterSchema {
  // declare any instance methods here
}

// Model is from mongoose.Model
interface RecruiterModelInterface extends Model<RecruiterInterface> {
  // declare any static methods here
  findByCredentials(email: string, password: string): Promise<IRecruiterSchema>; // this should be changed to the correct return type if possible.
}

export interface IRecruiterSchema extends Document {
  recruiterName: string;
  role: Number;
  email: string;
  tokens: IToken[];
  password: string;
  generateAuthToken: () => string;
}

const TokenSchema: Schema = new Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define Mongoose schema for recruiter
const RecruiterSchema: Schema = new Schema(
  {
    recruiterName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // validate(value: string) {
      //   if (!isEmail(value)) {
      //     throw new Error("Email is invalid");
      //   }
      // },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(value: string) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password can not contain "password"');
        }
      },
      role: {
        type: Number,
        required: true,
        validate(value: number) {
          if (value !== ROLETYPE.USER && value !== ROLETYPE.RECRUITER) {
            throw new Error(
              'Invalid role please role 1 for the recruiter and 2 for the user"'
            );
          }
        },
      },
    },
    tokens: [TokenSchema],
  },
  {
    timestamps: true,
  }
);

RecruiterSchema.methods.generateAuthToken = async function () {
  const recruiter = this;
  const token = jwt.sign(
    { _id: recruiter._id.toString(), role: ROLETYPE.RECRUITER },
    JWT_SECRET
  );

  recruiter.tokens = recruiter.tokens.concat({ token });
  await recruiter.save();
  return token;
};

RecruiterSchema.statics.findByCredentials = async (
  email: string,
  password: string
): Promise<IRecruiterSchema> => {
  const recruiter = await Recruiter.findOne({ email: email });

  if (!recruiter) {
    throw new Error("Couldn't find recruiter");
  }
  const isMatch = await bcrypt.compare(password, recruiter.password);

  if (!isMatch) {
    throw new Error("Passsword wrong");
  }

  return recruiter;
};

RecruiterSchema.pre("save", async function (next) {
  const recruiter = this;
  if (recruiter.isModified("password")) {
    const pass = recruiter.password;
    recruiter.password = await bcrypt.hash(pass as string, 8);
  }
  next();
});

// Define and export Recruiter model
// export const Recruiter = mongoose.model<IRecruiterSchema>("Recruiter", RecruiterSchema);

RecruiterSchema.virtual("applicants", {
  ref: "Applicant",
  localField: "_id",
  foreignField: "recruiterId",
});

export const Recruiter: RecruiterModelInterface = mongoose.model<
  RecruiterInterface,
  RecruiterModelInterface
>("recruiters", RecruiterSchema);

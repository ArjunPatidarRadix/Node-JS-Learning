import mongoose, { Schema, Document, Model } from "mongoose";
// import isEmail from "validator/lib/isEmail";
import jwt from "jsonwebtoken";
import { JWT_SECRET, ROLETYPE } from "../utils/enum";
import bcrypt from "bcryptjs";

// Define interface for user document

interface IToken {
  token: string;
  createdAt: Date;
}

export interface UserInterface extends IUserSchema {
  // declare any instance methods here
}

// Model is from mongoose.Model
interface UserModelInterface extends Model<UserInterface> {
  // declare any static methods here
  findByCredentials(email: string, password: string): Promise<IUserSchema>; // this should be changed to the correct return type if possible.
}

export interface IUserSchema extends Document {
  userName: string;
  userExperince: string;
  role: number;
  email: string;
  tokens: IToken[];
  password: string;
  generateAuthToken: () => string;
}

const TokenSchema: Schema = new Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define Mongoose schema for user
const UserSchema: Schema = new Schema(
  {
    userName: {
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
    userExperince: { type: String, required: true },
    role: {
      type: Number,
      required: true,
      trim: true,
      minLength: 1,
      validate(value: number) {
        console.log("::::::::::value ::", value);
        if (value !== ROLETYPE.USER && value !== ROLETYPE.RECRUITER) {
          throw new Error(
            'Invalid role please role 1 for the recruiter and 2 for the user"'
          );
        }
      },
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
    },
    tokens: [TokenSchema],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), role: ROLETYPE.USER },
    JWT_SECRET
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async (
  email: string,
  password: string
): Promise<IUserSchema> => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("Couldn't find user");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Passsword wrong");
  }

  return user;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const pass = user.password;
    user.password = await bcrypt.hash(pass as string, 8);
  }
  next();
});

// Define and export User model
// export const User = mongoose.model<IUserSchema>("User", UserSchema);

UserSchema.virtual("applicants", {
  ref: "Applicant",
  localField: "_id",
  foreignField: "userId",
});

export const User: UserModelInterface = mongoose.model<
  UserInterface,
  UserModelInterface
>("users", UserSchema);

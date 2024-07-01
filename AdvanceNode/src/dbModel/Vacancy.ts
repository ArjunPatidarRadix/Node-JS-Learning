import mongoose, { Schema, Document } from "mongoose";

// Define interface for user document
export interface IVacancySchema extends Document {
  jobTitle: string;
  jobDescription: string;
  exprerienceRequired: string;
}

// Define Mongoose schema for user
const VacancySchema: Schema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    jobDescription: { type: String, required: true },
    exprerienceRequired: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

VacancySchema.virtual("applicant", {
  ref: "Applicant",
  localField: "_id",
  foreignField: "vacancyId",
});

// Define and export Vacancy model
export const Vacancy = mongoose.model<IVacancySchema>("Vacancy", VacancySchema);

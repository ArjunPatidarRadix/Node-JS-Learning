import mongoose, { Schema, Document } from "mongoose";

// Define interface for user document
export interface IApplicantSchema extends Document {
  vacancyId: string;
  userId: string;
}

// Define Mongoose schema for user
const ApplicantSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    vacancyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Vacancy",
    },
  },
  {
    timestamps: true,
  }
);

// Define and export Applicant model
export const Applicant = mongoose.model<IApplicantSchema>(
  "Applicant",
  ApplicantSchema
);

import mongoose, { Schema, Document } from "mongoose";

export interface IInterviewSchema extends Document {
  vacancy: mongoose.Types.ObjectId;
  applicant: mongoose.Types.ObjectId;
  interviewDate: string;
  feedback: string;
  result: "Accepted" | "Rejected" | "Pending";
}

const InterviewSchema: Schema = new Schema({
  vacancy: { type: Schema.Types.ObjectId, ref: "Vacancy", required: true },
  applicant: { type: Schema.Types.ObjectId, ref: "users", required: true },
  interviewDate: {
    type: String,
    required: true,
    validate(value: string) {
      const splitDate = value.split("/");
      if (splitDate.length === 3) {
        const date = splitDate[0];
        const month = splitDate[1];
        const year = splitDate[2];
        if (isNaN(Number(date)) || date < "1" || date > "31") {
          throw new Error('Date should be "1 to 31"');
        } else if (isNaN(Number(month)) || month < "1" || month > "12") {
          throw new Error('Month should be "1 to 12"');
        } else if (isNaN(Number(year)) || year < "1") {
          throw new Error("Year should be greater than 0");
        }
      } else {
        throw new Error('Date format is wrong please use "DD/MM/YYYY"');
      }
    },
  },
  feedback: { type: String },
  result: {
    type: String,
    enum: ["Accepted", "Rejected", "Pending"],
    default: "Pending",
  },
});

InterviewSchema.index({ vacancy: 1, applicant: 1 }, { unique: true });

export const Interview = mongoose.model<IInterviewSchema>(
  "Interview",
  InterviewSchema
);

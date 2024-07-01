import mongoose from "mongoose";

const connectDb = async () => {
  const res = await mongoose.connect(
    "mongodb://localhost:27017/recruitmentsDb"
  );
};
export default connectDb;

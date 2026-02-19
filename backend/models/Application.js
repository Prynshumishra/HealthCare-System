import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    role: String,
    name: String,
    email: String,
    phone: String,
    countryCode: String,
    batch: String,
    resume: String,
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;

import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
  phone: String,
  token: String,
  isAuth: Boolean,
});

export const Phone = mongoose.model("phone", phoneSchema);

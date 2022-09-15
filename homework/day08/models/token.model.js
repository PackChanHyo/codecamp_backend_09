import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  token: String,
  phone: String,
  isAuth: Boolean,
});

export const Phone = mongoose.model("phone", postSchema);

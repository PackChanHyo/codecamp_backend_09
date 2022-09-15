import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  personal: String,
  prefer: String,
  pwd: String,
  phone: String,
  og: {
    title: String,
    description: String,
    image: String,
  },
});

export const UsersMb = mongoose.model("userMb", usersSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // we have to tell fields here
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passowrd: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("user", userSchema);

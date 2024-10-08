import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    signedupby: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;

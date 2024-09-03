import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    projectLink: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("projects", projectSchema);

export default Project;

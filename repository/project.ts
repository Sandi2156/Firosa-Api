import errorCodes from "../constants/error_codes";
import mongodb from "../integrations/mongodb";
import { AppError } from "../lib/exceptions";
import ProjectModel from "../models/project";

async function storeProject(
  projectId: string,
  projectLink: string,
  projectName: string,
  userId: string
) {
  await mongodb.connect();

  await ProjectModel.create({
    projectId,
    projectLink,
    userId,
    projectName,
  });
}

async function getProjectsByUserId(userId: string) {
  await mongodb.connect();

  return await ProjectModel.find({ userId });
}

async function deleteProject(projectId: string, userId: string) {
  await mongodb.connect();

  const project = await ProjectModel.find({ userId, _id: projectId });

  if (!project || !project.length)
    throw new AppError(
      errorCodes.BAD_REQUEST,
      "Project doesn't exist or You don't have access to this project!",
      400
    );

  await ProjectModel.deleteOne({ userId, _id: projectId });
}

export default {
  storeProject,
  getProjectsByUserId,
  deleteProject,
};

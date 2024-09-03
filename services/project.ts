import ecsClient from "../integrations/aws/ecs";
import { generateUniqueId } from "../lib/generate_unique_id";

import projectRepository from "../repository/project";

async function deployProject(
  gitURL: string,
  projectId?: string
): Promise<object> {
  const id: string = projectId ? projectId : generateUniqueId();

  await ecsClient.runCreateProjectCluster(gitURL, id);

  return {
    status: "queued",
    projectSlug: id,
  };
}

async function storeProject(
  projectId: string,
  projectLink: string,
  projectName: string,
  userId: string
) {
  await projectRepository.storeProject(
    projectId,
    projectLink,
    projectName,
    userId
  );
}

async function getProjectsByUserId(userId: string) {
  return await projectRepository.getProjectsByUserId(userId);
}

export default { deployProject, storeProject, getProjectsByUserId };

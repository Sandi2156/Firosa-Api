import ecsClient from "../integrations/aws/ecs";
import { generateUniqueId } from "../lib/generate_unique_id";

async function deployProject(
  gitURL: string,
  projectId?: string
): Promise<object> {
  const id: string = projectId ? projectId : generateUniqueId();

  await ecsClient.runCreateProjectCluster(gitURL, id);

  return {
    status: "queued",
    data: { projectSlug: id },
  };
}

export default { deployProject };

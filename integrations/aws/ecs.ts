import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";

import awsConfig from "../../config/aws";

const ecsClient = new ECSClient({
  credentials: {
    accessKeyId: awsConfig.AWS_ECS_ACCESS_KEY,
    secretAccessKey: awsConfig.AWS_ECS_SECRET,
  },
  region: awsConfig.REGION,
});

async function runCreateProjectCluster(gitURL: string, id: string) {
  const command = new RunTaskCommand({
    cluster: awsConfig.ECS_CLUSTER,
    taskDefinition: awsConfig.ECS_TASK,
    launchType: awsConfig.LAUNCH_TYPE,
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: [
          "subnet-010e8b4ccb428e8aa",
          "subnet-0d0fd969e10f85bbc",
          "subnet-048db184e7e022afa",
        ],
        securityGroups: ["sg-0168ae51d86df9ba9"],
        assignPublicIp: "ENABLED",
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: "vercel-builder",
          environment: [
            { name: "GIT_REPO_URL", value: gitURL },
            { name: "PROJECT_ID", value: id },
          ],
        },
      ],
    },
  });

  try {
    await ecsClient.send(command);
  } catch (error) {
    console.log("error");
  }
}

export default {
  runCreateProjectCluster,
};

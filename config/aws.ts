import { LaunchType } from "@aws-sdk/client-ecs";

export default {
  REGION: "ap-south-1",
  ECS_CLUSTER:
    "arn:aws:ecs:ap-south-1:008971673944:cluster/versel-cluster-clone",
  ECS_TASK:
    "arn:aws:ecs:ap-south-1:008971673944:task-definition/vercel-clone-task",
  AWS_ECS_ACCESS_KEY: process.env.AWS_ECS_ACCESS_KEY as string,
  AWS_ECS_SECRET: process.env.AWS_ECS_SECRET as string,
  LAUNCH_TYPE: LaunchType.FARGATE,
};

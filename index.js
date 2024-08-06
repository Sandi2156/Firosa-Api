const express = require("express");
const { generateSlug } = require("random-word-slugs");
const { ECSClient, RunTaskCommand } = require("@aws-sdk/client-ecs");
const cors = require("cors");
const Redis = require("ioredis");
const { Server } = require("socket.io");

const ecsClient = new ECSClient({
  credentials: {
    accessKeyId: process.env.AWS_ECS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ECS_SECRET,
  },
  region: "ap-south-1",
});

const subscriber = new Redis(
  `rediss://default:${process.env.REDIS_PASSWORD}@caching-1529a761-sandipan-050b.g.aivencloud.com:24119`
);

const io = new Server({ cors: "*" });

io.listen(9001, () => "Socket server is running on 9001");

io.on("connection", (socket) => {
  socket.on("subscribe", (channel) => {
    socket.join(channel);
    socket.emit("message", `Joined ${channel}`);
  });
});

const app = express();
const PORT = 9000;

const config = {
  CLUSTER: "arn:aws:ecs:ap-south-1:008971673944:cluster/versel-cluster-clone",
  TASK: "arn:aws:ecs:ap-south-1:008971673944:task-definition/vercel-clone-task",
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post("/project", async (req, res) => {
  const { gitURL, existingSlug } = req.body;
  const slug = existingSlug ? existingSlug : generateSlug();

  const command = new RunTaskCommand({
    cluster: config.CLUSTER,
    taskDefinition: config.TASK,
    launchType: "FARGATE",
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
            { name: "PROJECT_ID", value: slug },
          ],
        },
      ],
    },
  });

  await ecsClient.send(command);

  return res.json({
    status: "queued",
    data: { projectSlug: slug, url: `http://${slug}.localhost:8000` },
  });
});

async function initRedisSubscribe() {
  subscriber.psubscribe("logs:*");
  subscriber.on("pmessage", (pattern, channel, message) => {
    io.to(channel).emit("message", message);
  });
}

initRedisSubscribe();

app.listen(PORT, () => console.log(`Api server is listening on port ${PORT}`));

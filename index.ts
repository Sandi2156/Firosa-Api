const express = require("express");
const cors = require("cors");
const Redis = require("ioredis");
const { Server } = require("socket.io");
const http = require("http");
import router from "./routes";

const subscriber = new Redis(
  `rediss://default:${process.env.REDIS_PASSWORD}@caching-1529a761-sandipan-050b.g.aivencloud.com:24119`
);

const app = express();
const server = http.createServer(app);
const PORT = 9000;

const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket: any) => {
  socket.on("subscribe", (channel: any) => {
    socket.join(channel);
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: any, res: any) => {
  return res.json({
    app: "vercel clone",
    version: "1.0.0",
  });
});

app.use(router);

async function initRedisSubscribe() {
  subscriber.psubscribe("logs:*");
  subscriber.on("pmessage", (pattern: any, channel: any, message: any) => {
    io.to(channel).emit("message", message);
  });
}

initRedisSubscribe();

server.listen(process.env.PORT || PORT, () =>
  console.log(`Api server is listening on port ${PORT}`)
);

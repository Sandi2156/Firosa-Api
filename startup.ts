import subscriber from "./integrations/redis";

async function initRedisSubscribe(io: any) {
  subscriber.psubscribe("logs:*");
  subscriber.on("pmessage", (pattern: any, channel: any, message: any) => {
    io.to(channel).emit("message", message);
  });
}

export default async function startupInitialize(io: any) {
  initRedisSubscribe(io);

  io.on("connection", (socket: any) => {
    socket.on("subscribe", (channel: any) => {
      socket.join(channel);
    });
  });
}

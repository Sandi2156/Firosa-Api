export default {
  CONNECTION_STRING:
    process.env.ENV === "localhost" ? "mongodb://127.0.0.1:27017/firosa" : "",
};

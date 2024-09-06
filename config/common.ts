const appConfig = {
  PORT: process.env.PORT || 9000,
  UI_ENDPOINT: process.env.UI_ENDPOINT,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY as string,
};

export default { ...appConfig };

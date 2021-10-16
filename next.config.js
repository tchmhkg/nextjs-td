module.exports = {
  env: {
    REDIRECT_HOST: process.env.REDIRECT_HOST,
    CLIENT_ID: process.env.CLIENT_ID,
  },
  api: {
    externalResolver: true,
  },
};

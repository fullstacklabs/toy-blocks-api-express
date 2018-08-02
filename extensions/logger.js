const Raven = require("raven");
Raven.config(process.env.SENTRY_DSN).install();

const logger = error => {
  const { NODE_ENV } = process.env;
  if (!["prod", "staging"].includes(NODE_ENV)) {
    if (NODE_ENV === "dev") {
      console.warn(error);
    }
    return;
  }
  Raven.captureException(error);
};

module.exports = { logger, Raven };

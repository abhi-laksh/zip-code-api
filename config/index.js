const swaggerSpec = require('./swagger');
const logger = require('./winston');
const corsOptions = require('./cors');

module.exports = {
  corsOptions,
  swaggerSpec,
  winston: logger,
};
